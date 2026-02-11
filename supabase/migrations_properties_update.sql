
-- Add contact info columns to properties table
alter table public.properties 
add column if not exists contact_name text,
add column if not exists contact_email text,
add column if not exists contact_phone text,
add column if not exists contact_whatsapp text,
add column if not exists images text[] default '{}';

-- Allow updating these columns
-- (Policies already cover update for owner, so no change needed there if policies use 'true' for columns or just row check)
