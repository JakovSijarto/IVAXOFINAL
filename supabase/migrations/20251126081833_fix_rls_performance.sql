/*
  # Fix RLS Performance Issues

  1. Security Improvements
    - Optimize RLS policies to prevent re-evaluation of auth.uid() for each row
    - Replace `auth.uid()` with `(select auth.uid())` for better performance
    - This change caches the auth function result instead of calling it per row

  2. Changes Made
    - Drop and recreate policy on `stripe_customers`
    - Drop and recreate policy on `stripe_subscriptions` 
    - Drop and recreate policy on `stripe_orders`
*/

-- Fix stripe_customers RLS policy
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;

CREATE POLICY "Users can view their own customer data"
    ON stripe_customers
    FOR SELECT
    TO authenticated
    USING (user_id = (select auth.uid()) AND deleted_at IS NULL);

-- Fix stripe_subscriptions RLS policy
DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;

CREATE POLICY "Users can view their own subscription data"
    ON stripe_subscriptions
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (select auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );

-- Fix stripe_orders RLS policy
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;

CREATE POLICY "Users can view their own order data"
    ON stripe_orders
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (select auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );