# Netlify Environment Variables Setup

To fix the "Missing Supabase environment variables" and Stripe errors, add these environment variables in your Netlify dashboard:

## Steps:

1. Go to your Netlify site dashboard
2. Click **Site settings**
3. Click **Environment variables** in the left sidebar
4. Click **Add a variable** for each of the following:

## Required Environment Variables:

### Supabase Configuration:
```
VITE_SUPABASE_URL=https://tecatuyzeqrryckrfevd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2F0dXl6ZXFycnlja3JmZXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMDA0OTksImV4cCI6MjA3OTY3NjQ5OX0.Jp9c_txQR-ZpEZdMrU4TlRwlVUcIn88O9cYsFspvUrs
```

### Stripe Configuration:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_STRIPE_KEY
```

**To get your Stripe publishable key:**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Replace `pk_test_YOUR_ACTUAL_STRIPE_KEY` with your actual key

## After Adding Variables:

1. Click **Save**
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Deploy site**

Your site will rebuild with the environment variables and everything should work!
