/*
  # Add subscriber emails table
  
  1. New Tables
    - `subscriber_emails`
      - `id` (bigint, primary key)
      - `email` (text, unique, indexed)
      - `stripe_customer_id` (text)
      - `has_active_subscription` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `subscriber_emails` table
    - Add policy for service role access only
  
  3. Purpose
    - Track which emails have purchased subscriptions
    - Enable quick lookup for magic link authentication
    - Separate from Stripe sync for reliability
*/

CREATE TABLE IF NOT EXISTS subscriber_emails (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email text UNIQUE NOT NULL,
  stripe_customer_id text,
  has_active_subscription boolean DEFAULT false,
  last_verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriber_emails_email ON subscriber_emails(email);
CREATE INDEX IF NOT EXISTS idx_subscriber_emails_active ON subscriber_emails(has_active_subscription) WHERE has_active_subscription = true;

ALTER TABLE subscriber_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage subscriber emails"
  ON subscriber_emails
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_subscriber_emails_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_subscriber_emails_updated_at
  BEFORE UPDATE ON subscriber_emails
  FOR EACH ROW
  EXECUTE FUNCTION update_subscriber_emails_updated_at();
