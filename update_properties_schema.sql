-- Adicionar colunas para filtro de imóveis
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS parking INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS category TEXT;

-- Atualizar políticas se necessário (geralmente não precisa para novas colunas se a tabela já tem políticas)
-- Mas é bom garantir que o RLS permita ver essas colunas (Select * cobre isso)
