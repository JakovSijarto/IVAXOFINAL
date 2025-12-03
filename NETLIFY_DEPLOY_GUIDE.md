# Netlify Deployment Guide

## Environment Variables Setup

After deploying to Netlify, you MUST configure these environment variables in your Netlify dashboard:

### Steps:

1. Go to your Netlify site dashboard
2. Navigate to: **Site settings → Environment variables**
3. Add the following variables:

```
VITE_SUPABASE_URL=https://imsxvpbymxuoukeldpuw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltc3h2cGJ5bXh1b3VrZWxkcHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTc0NzMsImV4cCI6MjA4MDMzMzQ3M30.YComEpS7pPqPUkijrR92_1G0I2EtHEv_J0dWZ3ep5eE
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51MFvJjGp8AV7HwpgiTjQYCasn1TgxWD4IPqE9vD9e6fKMbiHpDBEaPNB9ykJ4VZFOaKusDSPAN73o0YOkbiExRij00QHlQw6ha
```

### Important Notes:

- After adding environment variables, you MUST trigger a new deploy for changes to take effect
- Click "Trigger deploy" → "Deploy site" in Netlify dashboard
- The build process will pick up the new environment variables

### Troubleshooting:

If checkout still doesn't work after setting environment variables:

1. Open browser console (F12)
2. Check if environment variables are loaded:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_URL)
   ```
3. If undefined, rebuild the site after adding env variables
4. Check Supabase Edge Function logs for errors

### Verify Deployment:

✅ Environment variables are set in Netlify
✅ Site is rebuilt after setting env variables
✅ Stripe checkout should now work on live URL
