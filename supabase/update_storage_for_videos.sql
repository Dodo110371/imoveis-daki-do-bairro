-- Atualizar configuração do bucket 'properties' para permitir vídeos e aumentar limite de tamanho
-- 100MB = 104857600 bytes
UPDATE storage.buckets
SET 
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
WHERE id = 'properties';

-- Garantir que policies permitam upload de vídeos (se houver restrição por mime-type nas policies, o que não parece ser o caso no script anterior)
-- As policies atuais apenas checam bucket_id = 'properties', então deve funcionar.
