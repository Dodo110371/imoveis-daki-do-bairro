-- Script to fix null categories and normalize data
-- Run this in Supabase SQL Editor

-- 1. Fix NULL categories (defaulting to 'casa' or inferring if possible)
UPDATE properties 
SET category = 'casa' 
WHERE category IS NULL;

-- 2. Fix NULL parking
UPDATE properties 
SET parking = 0 
WHERE parking IS NULL;

-- 3. Normalize categories to match 'anunciar' page values (lowercase, 'apto' instead of 'Apartamento')
UPDATE properties SET category = 'apto' WHERE category ILIKE 'Apartamento';
UPDATE properties SET category = 'casa' WHERE category ILIKE 'Casa';
UPDATE properties SET category = 'terreno' WHERE category ILIKE 'Terreno';
UPDATE properties SET category = 'comercial' WHERE category ILIKE 'Comercial';

-- 4. Fix type casing if needed (ensure 'Venda' and 'Aluguel' are Title Case as used in queries)
UPDATE properties SET type = 'Venda' WHERE type ILIKE 'venda';
UPDATE properties SET type = 'Aluguel' WHERE type ILIKE 'aluguel';
