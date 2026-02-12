-- Script para permitir que administradores vejam TODOS os imóveis
-- Execute no SQL Editor do Supabase

-- 1. Cria política para Admin ver TUDO na tabela properties
CREATE POLICY "Admins can view all properties"
ON public.properties
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 2. Cria política para Admin atualizar TUDO na tabela properties (para aprovar/rejeitar)
CREATE POLICY "Admins can update all properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 3. Cria política para Admin deletar TUDO na tabela properties
CREATE POLICY "Admins can delete all properties"
ON public.properties
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
