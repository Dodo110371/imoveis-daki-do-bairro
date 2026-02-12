-- Script de Correção Heurística de Categorias
-- Execute este script no Editor SQL do Supabase para corrigir imóveis classificados incorretamente

-- 1. Corrigir Apartamentos que estão como 'casa'
UPDATE properties 
SET category = 'apto' 
WHERE category = 'casa' 
AND (
  title ILIKE '%apartamento%' 
  OR title ILIKE '%apto%' 
  OR title ILIKE '%flat%'
  OR title ILIKE '%cobertura%'
  OR description ILIKE '%apartamento%' 
  OR description ILIKE '%apto%'
  OR description ILIKE '%flat%'
  OR description ILIKE '%cobertura%'
);

-- 2. Corrigir Comerciais que estão como 'casa'
UPDATE properties 
SET category = 'comercial' 
WHERE category = 'casa'
AND (
  title ILIKE '%comercial%' 
  OR title ILIKE '%loja%' 
  OR title ILIKE '%sala comercial%' 
  OR title ILIKE '%escritório%'
  OR description ILIKE '%sala comercial%'
  OR description ILIKE '%escritório%'
);

-- 3. Corrigir Terrenos que estão como 'casa'
UPDATE properties 
SET category = 'terreno' 
WHERE category = 'casa'
AND (
  title ILIKE '%terreno%' 
  OR title ILIKE '%lote%' 
  OR description ILIKE '%terreno%' 
  OR description ILIKE '%lote%'
);

-- 4. Normalizar variações de escrita para minúsculo
UPDATE properties SET category = 'apto' WHERE category ILIKE 'Apartamento';
UPDATE properties SET category = 'casa' WHERE category ILIKE 'Casa';
UPDATE properties SET category = 'terreno' WHERE category ILIKE 'Terreno';
UPDATE properties SET category = 'comercial' WHERE category ILIKE 'Comercial';
