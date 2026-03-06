-- Add promotion_receipt_url column to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS promotion_receipt_url text;
