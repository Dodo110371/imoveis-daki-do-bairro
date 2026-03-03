-- Script to fix foreign key constraint on agencies table to allow user deletion
-- This script drops the existing constraint and re-creates it with ON DELETE CASCADE

-- Drop the existing constraint
ALTER TABLE public.agencies
DROP CONSTRAINT IF EXISTS agencies_owner_id_fkey;

-- Add the constraint back with ON DELETE CASCADE
ALTER TABLE public.agencies
ADD CONSTRAINT agencies_owner_id_fkey
FOREIGN KEY (owner_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;
