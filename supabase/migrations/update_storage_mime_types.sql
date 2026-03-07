-- Update properties bucket to allow PDF files
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf']
WHERE id = 'properties';
