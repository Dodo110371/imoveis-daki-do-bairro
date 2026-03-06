-- Add promotion_status column to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS promotion_status text DEFAULT 'none';

-- Add constraint for valid values
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_promotion_status') THEN
        ALTER TABLE public.properties 
        ADD CONSTRAINT check_promotion_status 
        CHECK (promotion_status IN ('none', 'pending', 'active', 'rejected'));
    END IF;
END $$;
