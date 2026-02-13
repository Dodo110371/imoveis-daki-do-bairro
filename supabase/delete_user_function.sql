-- Função para deletar usuário por admin
create or replace function public.delete_user_by_admin(target_user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  -- Verifica se o usuário que executa a função é admin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ) then
    raise exception 'Acesso negado: Apenas administradores podem deletar usuários.';
  end if;

  -- Deleta o usuário da tabela de autenticação
  -- O ON DELETE CASCADE deve cuidar das tabelas públicas (profiles, properties, favorites)
  delete from auth.users where id = target_user_id;
end;
$$;
