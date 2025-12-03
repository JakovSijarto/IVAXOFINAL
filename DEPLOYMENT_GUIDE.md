# 🚀 Deployment Guide to Netlify via GitHub

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `ivaxo-subscription-app` (or your preferred name)
3. Choose **Public** or **Private**
4. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

Run these commands in your project folder:

```bash
git add .
git commit -m "Initial commit: Ivaxo subscription platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**Replace** `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Step 3: Deploy to Netlify

### Option A: Connect via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository: `ivaxo-subscription-app`
6. **Build settings** (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click **"Deploy site"**

### Option B: Use Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: ivaxo-app (or your choice)
# - Build command: npm run build
# - Publish directory: dist
```

## Step 4: Add Environment Variables in Netlify

1. In Netlify dashboard, go to your site
2. Click **Site settings** → **Environment variables**
3. Click **"Add a variable"** and add these:

### Required Variables:

```
VITE_SUPABASE_URL
Value: https://tecatuyzeqrryckrfevd.supabase.co

VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2F0dXl6ZXFycnlja3JmZXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMDA0OTksImV4cCI6MjA3OTY3NjQ5OX0.Jp9c_txQR-ZpEZdMrU4TlRwlVUcIn88O9cYsFspvUrs

VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_test_YOUR_ACTUAL_STRIPE_KEY_HERE
```

**Get your Stripe key:** https://dashboard.stripe.com/apikeys

## Step 5: Trigger Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for deployment to complete

## Step 6: Configure Stripe Webhook (Production)

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Enter your Netlify URL + `/api/stripe-webhook`:
   ```
   https://YOUR_SITE_NAME.netlify.app/api/stripe-webhook
   ```
4. Select these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Webhook signing secret**
6. Add it to Supabase Edge Function environment variables

## ✅ You're Done!

Your site is now live at: `https://YOUR_SITE_NAME.netlify.app`

### Automatic Deployments

Every time you push to your `main` branch on GitHub, Netlify will automatically rebuild and deploy your site!

```bash
# Make changes to your code
git add .
git commit -m "Update pricing page"
git push

# Netlify automatically deploys! 🎉
```

## 🐛 Troubleshooting

**Build fails:**
- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Make sure `package.json` dependencies are correct

**Site loads but features don't work:**
- Check browser console for errors
- Verify environment variables in Netlify
- Check Supabase and Stripe configuration

**Routing issues (404 on refresh):**
- Make sure `netlify.toml` exists with redirect rules
- Already included in your project! ✓

## 📞 Need Help?

- Netlify Support: https://docs.netlify.com/
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs

Happy deploying! 🚀
