import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
    'Content-Type': 'application/json',
  };

  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers,
  });
}

Deno.serve(async (req) => {
  try {
    console.log('=== Stripe Checkout Request Started ===');
    console.log('Method:', req.method);
    console.log('Origin:', req.headers.get('origin'));
    console.log('URL:', req.url);

    if (req.method === 'OPTIONS') {
      return corsResponse(null, 204);
    }

    if (req.method !== 'POST') {
      console.error('Invalid method:', req.method);
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const requestBody = await req.json();
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const { price_id, success_url, cancel_url, mode, guest_email } = requestBody;

    const error = validateParameters(
      { price_id, success_url, cancel_url, mode },
      {
        cancel_url: 'string',
        price_id: 'string',
        success_url: 'string',
        mode: { values: ['payment', 'subscription'] },
      },
    );

    if (error) {
      return corsResponse({ error }, 400);
    }

    let user = null;
    const authHeader = req.headers.get('Authorization');

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: userData, error: getUserError } = await supabase.auth.getUser(token);

      if (!getUserError && userData?.user) {
        user = userData.user;
      }
    }

    console.log('User authenticated:', !!user);

    let customerId = undefined;
    let customer = null;

    if (user) {
      const { data: customerData, error: getCustomerError } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .maybeSingle();

      if (getCustomerError) {
        console.error('Failed to fetch customer information from the database', getCustomerError);
        return corsResponse({ error: 'Failed to fetch customer information' }, 500);
      }

      if (customerData?.customer_id) {
        customer = customerData;
        customerId = customerData.customer_id;
      } else {
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: { userId: user.id },
        });

        console.log(`Created new Stripe customer ${newCustomer.id} for user ${user.id}`);

        const { error: createCustomerError } = await supabase.from('stripe_customers').insert({
          user_id: user.id,
          customer_id: newCustomer.id,
        });

        if (createCustomerError) {
          console.error('Failed to save customer information in the database', createCustomerError);

          try {
            await stripe.customers.del(newCustomer.id);
          } catch (deleteError) {
            console.error('Failed to clean up after customer mapping error:', deleteError);
          }

          return corsResponse({ error: 'Failed to create customer mapping' }, 500);
        }

        if (mode === 'subscription') {
          const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
            customer_id: newCustomer.id,
            status: 'not_started',
          });

          if (createSubscriptionError) {
            console.error('Failed to save subscription in the database', createSubscriptionError);

            try {
              await stripe.customers.del(newCustomer.id);
            } catch (deleteError) {
              console.error('Failed to delete Stripe customer after subscription creation error:', deleteError);
            }

            return corsResponse({ error: 'Unable to save the subscription in the database' }, 500);
          }
        }

        customerId = newCustomer.id;
        console.log(`Successfully set up new customer ${customerId} with subscription record`);
      }

      if (mode === 'subscription' && customerId) {
        const { data: subscription, error: getSubscriptionError } = await supabase
          .from('stripe_subscriptions')
          .select('status')
          .eq('customer_id', customerId)
          .maybeSingle();

        if (getSubscriptionError) {
          console.error('Failed to fetch subscription information from the database', getSubscriptionError);
          return corsResponse({ error: 'Failed to fetch subscription information' }, 500);
        }

        if (!subscription) {
          const { error: createSubscriptionError } = await supabase.from('stripe_subscriptions').insert({
            customer_id: customerId,
            status: 'not_started',
          });

          if (createSubscriptionError) {
            console.error('Failed to create subscription record for existing customer', createSubscriptionError);
            return corsResponse({ error: 'Failed to create subscription record for existing customer' }, 500);
          }
        }
      }
    }

    const origin = req.headers.get('origin') || '/';
    const contentSuccessUrl = `${origin}/content`;

    const sessionParams: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode,
      success_url: contentSuccessUrl,
      cancel_url,
    };

    if (customerId) {
      sessionParams.customer = customerId;
    }

    console.log('Creating checkout session with params:', JSON.stringify(sessionParams, null, 2));

    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log(`✅ Created checkout session ${session.id} for customer ${customerId}`);
    console.log('Session URL:', session.url);

    return corsResponse({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ CHECKOUT ERROR:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    return corsResponse({
      error: error.message || 'Failed to create checkout session',
      type: error.type || 'unknown_error',
      statusCode: error.statusCode || 500
    }, 500);
  }
});

type ExpectedType = 'string' | { values: string[] };
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(values: T, expected: Expectations<T>): string | undefined {
  for (const parameter in values) {
    const expectation = expected[parameter];
    const value = values[parameter];

    if (expectation === 'string') {
      if (value == null) {
        return `Missing required parameter ${parameter}`;
      }
      if (typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string got ${JSON.stringify(value)}`;
      }
    } else {
      if (!expectation.values.includes(value)) {
        return `Expected parameter ${parameter} to be one of ${expectation.values.join(', ')}`;
      }
    }
  }

  return undefined;
}