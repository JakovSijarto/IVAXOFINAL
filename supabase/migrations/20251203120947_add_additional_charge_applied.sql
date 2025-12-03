/*
  # Add additional_charge_applied column

  1. Changes
    - Add `additional_charge_applied` boolean column to `stripe_subscriptions` table
    - Defaults to false
    - Used to track if the one-time 29 EUR charge has been applied to the subscription

  2. Notes
    - This column prevents duplicate charges when webhook fires multiple times
    - Once set to true, the additional charge won't be applied again
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stripe_subscriptions' AND column_name = 'additional_charge_applied'
  ) THEN
    ALTER TABLE stripe_subscriptions ADD COLUMN additional_charge_applied boolean DEFAULT false;
  END IF;
END $$;