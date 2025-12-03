import { supabase } from './supabase';
import type { StripeProduct } from '../stripe-config';

export interface SubscriptionData {
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export const createCheckoutSession = async (product: StripeProduct, email?: string) => {
  const { data: { session } } = await supabase.auth.getSession();

  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const body: any = {
    price_id: product.priceId,
    mode: product.mode,
    success_url: `${window.location.origin}/content`,
    cancel_url: `${window.location.origin}/pricing`,
  };

  console.log('Creating checkout with:', body);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  console.log('Checkout response status:', response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Checkout error response:', errorData);
    const errorMsg = errorData.error || 'Failed to create checkout session';
    const details = errorData.details ? `\n${errorData.details}` : '';
    throw new Error(errorMsg + details);
  }

  const data = await response.json();
  console.log('Checkout success:', data);
  return data;
};

export const getUserSubscription = async (): Promise<SubscriptionData | null> => {
  const { data, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return data;
};

export const redirectToCheckout = (sessionId: string) => {
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  if (!stripeKey || stripeKey.includes('YOUR_KEY_HERE')) {
    throw new Error('Stripe not configured. Please add your Stripe publishable key to environment variables.');
  }

  const stripe = (window as any).Stripe(stripeKey);

  if (!stripe) {
    throw new Error('Stripe.js failed to load. Please check your internet connection.');
  }

  return stripe.redirectToCheckout({ sessionId });
};