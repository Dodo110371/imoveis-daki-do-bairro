-- Enable the storage extension if not already enabled
create extension if not exists "storage" schema "extensions";

-- ---------------------------------------------------------
-- PROPERTIES BUCKET CONFIGURATION
-- ---------------------------------------------------------

-- Create the 'properties' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('properties', 'properties', true)
on conflict (id) do update set public = true;

-- Drop existing policies for properties to avoid conflicts
drop policy if exists properties_select_policy on storage.objects;
drop policy if exists properties_insert_policy on storage.objects;
drop policy if exists properties_update_policy on storage.objects;
drop policy if exists properties_delete_policy on storage.objects;
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated Upload" on storage.objects;
drop policy if exists "Owner Update" on storage.objects;
drop policy if exists "Owner Delete" on storage.objects;

-- Create policies for the 'properties' bucket

-- 1. Allow public read access to all files in the 'properties' bucket
create policy "properties_select_policy"
on storage.objects for select
using ( bucket_id = 'properties' );

-- 2. Allow authenticated users to upload files to their own folder
-- Path structure: user_id/filename
create policy "properties_insert_policy"
on storage.objects for insert
with check (
  bucket_id = 'properties' 
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- 3. Allow users to update their own files
create policy "properties_update_policy"
on storage.objects for update
using (
  bucket_id = 'properties' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Allow users to delete their own files
create policy "properties_delete_policy"
on storage.objects for delete
using (
  bucket_id = 'properties' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- ---------------------------------------------------------
-- AVATARS BUCKET CONFIGURATION
-- ---------------------------------------------------------

-- Create the 'avatars' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

-- Drop existing policies for avatars
drop policy if exists avatars_select_policy on storage.objects;
drop policy if exists avatars_insert_policy on storage.objects;
drop policy if exists avatars_update_policy on storage.objects;
drop policy if exists avatars_delete_policy on storage.objects;

-- 1. Allow public read access
create policy "avatars_select_policy"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- 2. Allow authenticated users to upload their own avatar
-- Note: Avatars might be stored as just "filename" or "user_id/filename". 
-- The code uses "user_id-random.ext" at the root of the bucket.
-- So we check if the filename starts with the user_id.
create policy "avatars_insert_policy"
on storage.objects for insert
with check (
  bucket_id = 'avatars' 
  and auth.role() = 'authenticated'
  and name like (auth.uid() || '-%')
);

-- 3. Allow users to update their own avatar
create policy "avatars_update_policy"
on storage.objects for update
using (
  bucket_id = 'avatars' 
  and auth.uid()::text = split_part(name, '-', 1)
);

-- 4. Allow users to delete their own avatar
create policy "avatars_delete_policy"
on storage.objects for delete
using (
  bucket_id = 'avatars' 
  and auth.uid()::text = split_part(name, '-', 1)
);
