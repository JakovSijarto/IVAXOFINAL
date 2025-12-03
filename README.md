# Ivaxo - Stripe Subscription Platform

A modern subscription platform built with React, TypeScript, Supabase, and Stripe.

## Features

- User authentication with Supabase
- Stripe subscription payments
- Beautiful modern UI with Tailwind CSS
- Responsive design
- Real-time subscription status

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (Auth + Database)
- **Payments**: Stripe
- **Hosting**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (test mode)
- Netlify account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ivaxo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Run the development server:
```bash
npm run dev
```

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Add environment variables in Site settings → Environment variables
6. Deploy!

### Environment Variables for Netlify

Add these in your Netlify dashboard:

```
VITE_SUPABASE_URL=https://tecatuyzeqrryckrfevd.supabase.co
VITE_SUPABASE_ANON_KEY=your_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## Testing Payments

Use Stripe test cards to test payments:

**Successful Payment:**
```
Card: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
ZIP: 12345
```

See `STRIPE_TEST_GUIDE.md` for more test scenarios.

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── index.css       # Global styles
├── supabase/
│   ├── migrations/     # Database migrations
│   └── functions/      # Edge functions
└── public/             # Static assets
```

## License

MIT
