-- Script Unificado para Correção de Permissões (Storage + Database) v2
-- Execute este script COMPLETO no SQL Editor do Supabase para corrigir problemas de upload e cadastro.

-- PARTE 1: PERMISSÕES DE STORAGE (Correção de Upload de Imagens)
-- Garante que o bucket 'properties' existe e é público
insert into storage.buckets (id, name, public)
values ('properties', 'properties', true)
on conflict (id) do update set public = true;

-- Remove políticas antigas para evitar conflitos (Lista expandida de nomes comuns)
drop policy if exists "properties_select_policy" on storage.objects;
drop policy if exists "properties_insert_policy" on storage.objects;
drop policy if exists "properties_update_policy" on storage.objects;
drop policy if exists "properties_delete_policy" on storage.objects;
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated Upload" on storage.objects;
drop policy if exists "Owner Update" on storage.objects;
drop policy if exists "Owner Delete" on storage.objects;
drop policy if exists "Give users access to own folder" on storage.objects;
drop policy if exists "Allow public read access" on storage.objects;

-- 1. Permitir leitura pública de todos os arquivos no bucket 'properties'
create policy "properties_select_policy"
on storage.objects for select
using ( bucket_id = 'properties' );

-- 2. Permitir upload apenas para usuários autenticados no bucket 'properties'
create policy "properties_insert_policy"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'properties' );

-- 3. Permitir atualização apenas pelo dono do arquivo no bucket 'properties'
create policy "properties_update_policy"
on storage.objects for update
to authenticated
using ( bucket_id = 'properties' and auth.uid() = owner );

-- 4. Permitir deleção apenas pelo dono do arquivo no bucket 'properties'
create policy "properties_delete_policy"
on storage.objects for delete
to authenticated
using ( bucket_id = 'properties' and auth.uid() = owner );


-- PARTE 2: PERMISSÕES DE BANCO DE DADOS (Correção de Cadastro de Imóveis)
-- Habilita RLS na tabela properties
alter table "properties" enable row level security;

-- Remove políticas antigas (Lista expandida de nomes comuns e variações)
drop policy if exists "Users can insert their own properties" on "properties";
drop policy if exists "Users can update their own properties" on "properties";
drop policy if exists "Users can delete their own properties" on "properties";
drop policy if exists "Properties are viewable by everyone" on "properties";
drop policy if exists "Enable read access for all users" on "properties";
drop policy if exists "Enable insert for authenticated users only" on "properties";
drop policy if exists "Enable update for users based on email" on "properties";
drop policy if exists "Enable delete for users based on user_id" on "properties";
drop policy if exists "public_select" on "properties";
drop policy if exists "auth_insert" on "properties";
drop policy if exists "owner_update" on "properties";
drop policy if exists "owner_delete" on "properties";

-- 1. Permitir INSERT para usuários autenticados (Garante que o dono seja o usuário logado)
create policy "Users can insert their own properties"
on "properties" for insert
to authenticated
with check ( auth.uid() = owner_id );

-- 2. Permitir UPDATE apenas para o dono do imóvel
create policy "Users can update their own properties"
on "properties" for update
to authenticated
using ( auth.uid() = owner_id );

-- 3. Permitir DELETE apenas para o dono do imóvel
create policy "Users can delete their own properties"
on "properties" for delete
to authenticated
using ( auth.uid() = owner_id );

-- 4. Permitir SELECT público (Todos podem ver os imóveis)
create policy "Properties are viewable by everyone"
on "properties" for select
using ( true );
