-- Script unificado para adicionar todas as colunas necessárias na tabela properties
-- Este script verifica e adiciona colunas de endereço, preço e características se não existirem

-- Colunas de Endereço
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS cep text,
ADD COLUMN IF NOT EXISTS street text,
ADD COLUMN IF NOT EXISTS number text,
ADD COLUMN IF NOT EXISTS complement text,
ADD COLUMN IF NOT EXISTS neighborhood text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text;

-- Colunas de Preço (além de 'price' que já deve existir)
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS condo_price numeric,
ADD COLUMN IF NOT EXISTS iptu_price numeric;

-- Coluna de Características (Array de texto)
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS features text[];

-- Colunas de Contato (caso faltem)
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS contact_name text,
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS contact_phone text,
ADD COLUMN IF NOT EXISTS contact_whatsapp text;

-- Comentário para confirmar execução
COMMENT ON TABLE public.properties IS 'Tabela de imóveis com colunas de endereço e preços atualizadas';
