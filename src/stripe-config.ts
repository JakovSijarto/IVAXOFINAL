export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  currencySymbol: string;
  setupFeePriceId?: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SaDMXGp8AV7HwpgMWketb9C',
    name: 'Ivaxo Partner',
    description: 'Full access to Ivaxo premium photos & videos.',
    mode: 'subscription',
    price: 30.00,
    currency: 'eur',
    currencySymbol: '€',
    setupFeePriceId: 'price_1SaDMXGp8AV7HwpgiL7xZXe3',
  },
];