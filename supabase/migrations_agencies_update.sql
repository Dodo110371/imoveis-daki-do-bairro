-- Add owner_id, status, plan, creci, and description columns to agencies table
alter table public.agencies 
add column if not exists owner_id uuid references public.profiles(id),
add column if not exists status text default 'pending' check (status in ('pending', 'active', 'suspended')),
add column if not exists plan text default 'free' check (plan in ('free', 'bronze', 'silver', 'gold')),
add column if not exists creci text,
add column if not exists description text;

-- Update RLS policies for agencies
drop policy if exists "Agencies are viewable by everyone" on public.agencies;

create policy "Agencies are viewable by everyone" on public.agencies
  for select using (status = 'active');

create policy "Users can create agencies" on public.agencies
  for insert with check (auth.uid() = owner_id);

create policy "Owners can update own agency" on public.agencies
  for update using (auth.uid() = owner_id);

-- Create a function to handle agency registration safely if needed, 
-- but RLS should be enough for now if we use the authenticated user's ID.
