-- Add status column to properties table
alter table public.properties 
add column if not exists status text default 'pending';

-- Update existing properties to be active (so current demo/production data remains visible)
update public.properties 
set status = 'active' 
where status is null or status = 'pending';

-- Add check constraint for valid statuses
alter table public.properties 
add constraint properties_status_check 
check (status in ('active', 'pending', 'inactive', 'sold'));

-- Create index for faster filtering
create index if not exists properties_status_idx on public.properties (status);

-- Update RLS policies to ensure public can only see active properties
-- Note: We need to modify the "Public properties are viewable by everyone" policy
-- First, drop the old one if we want to be strict, or just rely on the application layer filtering for now.
-- Ideally, RLS should enforce this.

drop policy if exists "Properties are viewable by everyone" on public.properties;

create policy "Properties are viewable by everyone" 
on public.properties for select 
using ( status = 'active' or auth.uid() = owner_id );
