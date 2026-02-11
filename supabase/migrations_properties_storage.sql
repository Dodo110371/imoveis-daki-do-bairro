
-- Create 'properties' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('properties', 'properties', true)
on conflict (id) do nothing;

-- Enable RLS
alter table storage.objects enable row level security;

-- Policy: Public Read Access
drop policy if exists "Properties images are publicly accessible" on storage.objects;
create policy "Properties images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'properties' );

-- Policy: Authenticated Upload (Users can upload to their own folder)
-- Path convention: properties/{user_id}/{filename}
drop policy if exists "Users can upload property images" on storage.objects;
create policy "Users can upload property images"
  on storage.objects for insert
  with check (
    bucket_id = 'properties' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Policy: Users can update/delete their own images
drop policy if exists "Users can update own property images" on storage.objects;
create policy "Users can update own property images"
  on storage.objects for update
  using (
    bucket_id = 'properties' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can delete own property images" on storage.objects;
create policy "Users can delete own property images"
  on storage.objects for delete
  using (
    bucket_id = 'properties' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
