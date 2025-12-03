export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  currencySymbol: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SXJlUGp8AV7HwpgVBpx86A9',
    name: 'Ivaxo Partner',
    description: 'Full access to Ivaxo premium photos & videos.',
    mode: 'subscription',
    price: 1.00,
    currency: 'eur',
    currencySymbol: '€',
  },
];