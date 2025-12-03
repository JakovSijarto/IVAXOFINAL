/*
  # Add password field to subscriber_emails table
  
  1. Changes
    - Add `password` column (text, nullable initially)
    - Add index on password for faster lookups
  
  2. Purpose
    - Store secure randomly generated passwords for each subscriber
    - Replace magic link authentication with password-based access
    - Each user gets a unique secure password after subscribing
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriber_emails' AND column_name = 'password'
  ) THEN
    ALTER TABLE subscriber_emails ADD COLUMN password text;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_subscriber_emails_password ON subscriber_emails(password) WHERE password IS NOT NULL;