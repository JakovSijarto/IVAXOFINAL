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

function generateSecurePassword(): string {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercase = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const special = '!@#$%^&*';

  const allChars = uppercase + lowercase + numbers + special;

  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  for (let i = 0; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password.split('').sort(() => Math.random() - 0.5).join('');
}

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

    console.log('=== PASSWORD GENERATION REQUEST ===');
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

    const password = generateSecurePassword();

    console.log('Generated secure password for:', normalizedEmail);

    const { error: updateError } = await supabase
      .from('subscriber_emails')
      .update({
        password: password,
        last_verified_at: new Date().toISOString()
      })
      .eq('email', normalizedEmail);

    if (updateError) {
      console.error('Failed to update password:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate password' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Your Access Password</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Thank you for subscribing! Here is your secure access password:
        </p>
        <div style="background: #f3f4f6; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Your Password:</p>
          <p style="font-size: 24px; font-weight: bold; color: #1f2937; letter-spacing: 2px; margin: 0; font-family: monospace;">
            ${password}
          </p>
        </div>
        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          <strong>Important:</strong>
        </p>
        <ul style="color: #666; font-size: 14px; line-height: 1.8;">
          <li>Copy this password and save it securely</li>
          <li>Use this password to access your premium content</li>
          <li>Do not share this password with anyone</li>
          <li>You can request a new password anytime</li>
        </ul>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            If you didn't request this password, please ignore this email.
          </p>
        </div>
      </div>
    `;

    const { error: emailError } = await supabase.auth.admin.sendRawEmail({
      to: normalizedEmail,
      subject: 'Your Premium Content Access Password',
      html: emailHtml,
    });

    if (emailError) {
      console.error('Failed to send email:', emailError);
      return new Response(
        JSON.stringify({
          error: 'Password generated but failed to send email. Please contact support.',
          password: password
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Password generated and sent to:', normalizedEmail);
    console.log('=== END PASSWORD GENERATION REQUEST ===');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Password sent! Check your email inbox (and spam folder) for your access password.'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ Error in generate-password:', error);
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