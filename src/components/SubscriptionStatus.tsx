import React, { useState, useEffect } from 'react';
import { getUserSubscription } from '../lib/stripe';
import { stripeProducts } from '../stripe-config';
import type { SubscriptionData } from '../lib/stripe';

export const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await getUserSubscription();
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="glass-effect rounded-2xl p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription || !subscription.price_id) {
    return (
      <div className="glass-effect rounded-2xl p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-3">Subscription Status</h3>
        <p className="text-slate-600">No active subscription</p>
      </div>
    );
  }

  const product = stripeProducts.find(p => p.priceId === subscription.price_id);
  const planName = product?.name || 'Unknown Plan';

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-700 bg-emerald-100';
      case 'past_due':
        return 'text-amber-700 bg-amber-100';
      case 'canceled':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Subscription Status</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-600">Plan:</span>
          <span className="text-sm font-medium text-slate-900">{planName}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-600">Status:</span>
          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-lg ${getStatusColor(subscription.subscription_status)}`}>
            {subscription.subscription_status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {subscription.current_period_end && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-600">
              {subscription.cancel_at_period_end ? 'Expires:' : 'Renews:'}
            </span>
            <span className="text-sm font-medium text-slate-900">
              {formatDate(subscription.current_period_end)}
            </span>
          </div>
        )}

        {subscription.payment_method_brand && subscription.payment_method_last4 && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-600">Payment Method:</span>
            <span className="text-sm font-medium text-slate-900">
              {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};