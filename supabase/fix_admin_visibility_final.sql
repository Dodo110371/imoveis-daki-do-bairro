-- Script FINAL para corrigir visibilidade do Admin
-- Execute este script no SQL Editor do Supabase

-- 1. Corrige dados inconsistentes (Imóveis sem status viram 'pending')
UPDATE public.properties 
SET status = 'pending' 
WHERE status IS NULL OR status = '';

-- 2. Garante que a verificação de permissão (tabela profiles) funcione
-- Permite que o sistema leia os perfis para checar quem é admin
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING ( true );

-- 3. Refaz as políticas de segurança da tabela de Imóveis (Properties)
-- Remove políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Admins can view all properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can update all properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can delete all properties" ON public.properties;

-- Recria política de LEITURA: Admin vê TUDO; Dono vê SEUS; Público vê ATIVOS
CREATE POLICY "Unified Property Read Access"
ON public.properties FOR SELECT
USING (
  -- Usuário é Admin
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  OR 
  -- Usuário é o Dono do imóvel
  owner_id = auth.uid()
  OR
  -- Imóvel está Ativo (Público)
  status = 'active'
);

-- Recria política de ATUALIZAÇÃO: Admin ou Dono podem editar
CREATE POLICY "Unified Property Update Access"
ON public.properties FOR UPDATE
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  OR 
  owner_id = auth.uid()
);

-- Recria política de DELEÇÃO: Admin ou Dono podem deletar
CREATE POLICY "Unified Property Delete Access"
ON public.properties FOR DELETE
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  OR 
  owner_id = auth.uid()
);
