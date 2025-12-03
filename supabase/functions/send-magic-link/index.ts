import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('=== MAGIC LINK REQUEST ===');
    console.log('Email requested:', email);

    const normalizedEmail = email.toLowerCase().trim();

    console.log('Checking subscription for:', normalizedEmail);

    const { data: subscriber, error: lookupError } = await supabase
      .from('subscriber_emails')
      .select('*')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error('Database lookup error:', lookupError);
      return new Response(
        JSON.stringify({ error: 'Failed to check subscription status' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!subscriber) {
      console.log('Email not found in database:', normalizedEmail);
      return new Response(
        JSON.stringify({
          error: 'No subscription found. Please subscribe at the pricing page first.'
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!subscriber.has_active_subscription) {
      console.log('Subscription not active for:', normalizedEmail);
      return new Response(
        JSON.stringify({
          error: 'Your subscription is not active. Please check your payment status or subscribe at the pricing page.'
        }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Active subscription confirmed, sending magic link to:', normalizedEmail);

    const origin = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || 'http://localhost:5173';
    const redirectUrl = origin + '/content';

    console.log('Redirect URL:', redirectUrl);
    console.log('Calling Supabase Auth signInWithOtp...');

    const { data, error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: redirectUrl,
        shouldCreateUser: true,
      },
    });

    if (error) {
      console.error('❌ Supabase Auth error:', JSON.stringify(error, null, 2));
      return new Response(
        JSON.stringify({
          error: 'Failed to send magic link. Please try again.',
          details: error.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Supabase Auth response:', JSON.stringify(data, null, 2));

    const { error: updateError } = await supabase
      .from('subscriber_emails')
      .update({ last_verified_at: new Date().toISOString() })
      .eq('email', normalizedEmail);

    if (updateError) {
      console.error('Failed to update last_verified_at:', updateError);
    }

    console.log('✅ Magic link sent successfully to:', normalizedEmail);
    console.log('=== END MAGIC LINK REQUEST ===');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Magic link sent! Check your email inbox (and spam folder) to access premium content.'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ Error in send-magic-link:', error);
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});