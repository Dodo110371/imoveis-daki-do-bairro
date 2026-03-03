-- Script to add updated_at column to properties table
-- Run this in Supabase SQL Editor

-- 1. Add column
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;

-- 2. Create function to update timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Create trigger
DROP TRIGGER IF EXISTS on_properties_updated ON public.properties;
CREATE TRIGGER on_properties_updated
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- 4. Update existing rows to have updated_at equal to created_at if null (though default handles it)
UPDATE public.properties SET updated_at = created_at WHERE updated_at IS NULL;
