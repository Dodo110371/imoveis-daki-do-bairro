-- Adiciona colunas de contato e status na tabela properties
-- Execute este script no SQL Editor do Supabase para corrigir o erro de colunas faltantes

ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS contact_name text,
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS contact_phone text,
ADD COLUMN IF NOT EXISTS contact_whatsapp text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- Opcional: Criar índice para melhorar performance de filtros por status
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
