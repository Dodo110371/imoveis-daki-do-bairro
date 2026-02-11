-- Script to fix Storage Bucket permissions and creation
-- Run this in the Supabase SQL Editor

-- 1. Create 'properties' bucket if it doesn't exist and make it PUBLIC
INSERT INTO storage.buckets (id, name, public)
VALUES ('properties', 'properties', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Enable RLS on storage.objects (good practice)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Clean up old policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "User Update" ON storage.objects;
DROP POLICY IF EXISTS "User Delete" ON storage.objects;
DROP POLICY IF EXISTS "User Update/Delete" ON storage.objects;

-- 4. Create new policies

-- Allow ANYONE to view images (needed for the site to display them)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'properties' );

-- Allow AUTHENTICATED users to upload images
-- We use a broad permission for 'properties' bucket to ensure uploads work
-- Ideally we would restrict to (storage.foldername(name))[1] = auth.uid()::text
-- But for troubleshooting, let's allow authenticated users to insert into this bucket
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'properties' );

-- Allow users to update their own files
CREATE POLICY "User Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'properties' AND owner = auth.uid() );

-- Allow users to delete their own files
CREATE POLICY "User Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'properties' AND owner = auth.uid() );

-- 5. Ensure properties table images column is correct
-- This makes sure existing NULLs become empty arrays if any
UPDATE public.properties SET images = '{}' WHERE images IS NULL;
