-- Script Seguro para corrigir permissões do Storage
-- Este script evita alterar configurações de sistema que causam erro 42501

-- 1. Garante que o bucket 'properties' existe e é público
INSERT INTO storage.buckets (id, name, public)
VALUES ('properties', 'properties', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Cria policies específicas para este bucket (sem tentar alterar a tabela ou remover policies de sistema)
DO $$
BEGIN
    -- Policy de Leitura Pública (Se não existir)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Public Access Properties'
    ) THEN
        CREATE POLICY "Public Access Properties"
        ON storage.objects FOR SELECT
        USING ( bucket_id = 'properties' );
    END IF;

    -- Policy de Upload para Usuários Logados (Se não existir)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Authenticated Upload Properties'
    ) THEN
        CREATE POLICY "Authenticated Upload Properties"
        ON storage.objects FOR INSERT
        TO authenticated
        WITH CHECK ( bucket_id = 'properties' );
    END IF;

    -- Policy de Deleção para Dono do Arquivo (Se não existir)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'User Delete Properties'
    ) THEN
        CREATE POLICY "User Delete Properties"
        ON storage.objects FOR DELETE
        TO authenticated
        USING ( bucket_id = 'properties' AND owner = auth.uid() );
    END IF;
    
    -- Policy de Atualização para Dono do Arquivo (Se não existir)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'User Update Properties'
    ) THEN
        CREATE POLICY "User Update Properties"
        ON storage.objects FOR UPDATE
        TO authenticated
        USING ( bucket_id = 'properties' AND owner = auth.uid() );
    END IF;
END
$$;