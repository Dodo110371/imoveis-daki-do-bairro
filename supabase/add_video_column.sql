-- Adicionar coluna de vídeo na tabela de imóveis
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS video_url text;

-- Comentário na coluna para documentação
COMMENT ON COLUMN public.properties.video_url IS 'URL do vídeo do imóvel (YouTube, Vimeo ou Storage)';
