export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  currencySymbol: string;
  additionalCharge?: number;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SaDMXGp8AV7HwpgMWketb9C',
    name: 'Ivaxo Partner',
    description: 'Full access to Ivaxo premium photos & videos.',
    mode: 'subscription',
    price: 1.00,
    currency: 'eur',
    currencySymbol: '€',
    additionalCharge: 29.00,
  },
];