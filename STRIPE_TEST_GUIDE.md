# 🧪 How to Test Stripe Payments

## Stripe Test Mode Credit Cards

Use these test card numbers in Stripe's test mode to simulate different payment scenarios:

### ✅ Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### 💳 Other Test Cards

**Visa (Successful)**
```
4242 4242 4242 4242
```

**Visa (Requires 3D Secure)**
```
4000 0025 0000 3155
```

**Mastercard (Successful)**
```
5555 5555 5555 4444
```

**Amex (Successful)**
```
3782 822463 10005
```

**Card Declined**
```
4000 0000 0000 0002
```

**Insufficient Funds**
```
4000 0000 0000 9995
```

## 🎯 How to Test Your App

### Step 1: Sign Up
1. Go to `/signup`
2. Create a new account with any email
3. Use a password at least 6 characters long

### Step 2: Go to Pricing
1. After signing in, click "View Plans & Pricing"
2. Or navigate to `/pricing`

### Step 3: Subscribe
1. Click "Subscribe Now" button
2. You'll be redirected to Stripe Checkout

### Step 4: Enter Test Payment Details
```
Email: test@example.com
Card Number: 4242 4242 4242 4242
Expiry Date: 12/34
CVC: 123
Name: Test User
```

### Step 5: Complete Payment
1. Click "Subscribe" or "Pay"
2. You'll be redirected to the Success page
3. Check your Dashboard to see the active subscription

## 🔍 Verify in Stripe Dashboard

1. Go to https://dashboard.stripe.com/test/payments
2. You should see your test payment
3. Check https://dashboard.stripe.com/test/subscriptions for subscription details

## 🛠️ Webhook Testing

Your webhook endpoint is:
```
https://tecatuyzeqrryckrfevd.supabase.co/functions/v1/stripe-webhook
```

To test webhooks locally:
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe listen --forward-to your-supabase-url/functions/v1/stripe-webhook`
3. Update your webhook secret in Supabase dashboard

## 🚨 Common Issues

**"Missing value for Stripe(): apiKey"**
- Make sure `VITE_STRIPE_PUBLISHABLE_KEY` is set in Netlify environment variables

**"Authentication required"**
- Make sure you're logged in before trying to subscribe

**Webhook not working**
- Verify your webhook secret is configured in Supabase
- Check Supabase function logs for errors

## 📝 Notes

- Test mode payments never charge real money
- Use test card numbers only in test mode
- Switch to live mode when ready for production
- Never commit API keys to your repository

## 🎉 Success!

When everything works:
1. User signs up
2. User subscribes with test card
3. Stripe processes payment
4. Webhook updates subscription status
5. User sees active subscription in Dashboard

Happy testing! 🚀
