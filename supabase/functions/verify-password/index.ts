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
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('=== PASSWORD VERIFICATION REQUEST ===');
    console.log('Email:', email);

    const normalizedEmail = email.toLowerCase().trim();

    const { data: subscriber, error: lookupError } = await supabase
      .from('subscriber_emails')
      .select('*')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error('Database lookup error:', lookupError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify credentials' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!subscriber) {
      console.log('Email not found:', normalizedEmail);
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!subscriber.has_active_subscription) {
      console.log('Subscription not active:', normalizedEmail);
      return new Response(
        JSON.stringify({ error: 'Your subscription is not active' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (subscriber.password !== password) {
      console.log('Invalid password for:', normalizedEmail);
      return new Response(
        JSON.stringify({ error: 'Invalid password' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Password verified for:', normalizedEmail);

    const { data: authData, error: authError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: normalizedEmail,
    });

    if (authError || !authData.properties) {
      console.error('Failed to generate session:', authError);
      return new Response(
        JSON.stringify({ error: 'Failed to create session' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { error: updateError } = await supabase
      .from('subscriber_emails')
      .update({ last_verified_at: new Date().toISOString() })
      .eq('email', normalizedEmail);

    if (updateError) {
      console.error('Failed to update last_verified_at:', updateError);
    }

    console.log('✅ Session created for:', normalizedEmail);
    console.log('=== END PASSWORD VERIFICATION ===');

    return new Response(
      JSON.stringify({
        success: true,
        session: {
          access_token: authData.properties.access_token,
          refresh_token: authData.properties.refresh_token,
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ Error in verify-password:', error);
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