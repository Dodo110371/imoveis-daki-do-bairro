-- Add columns for promotion flow
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS promotion_receipt_url text;

ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS promotion_status text DEFAULT 'none';

-- Force schema cache reload to ensure new columns are visible immediately
NOTIFY pgrst, 'reload config';
