-- Substitua 'seu-email@exemplo.com' pelo seu email de login
-- Execute este script no SQL Editor do Supabase para se tornar admin

update public.profiles
set role = 'admin'
where id in (
  select id from auth.users where email = 'seu-email@exemplo.com'
);

-- Verificar se funcionou
select email, role 
from public.profiles 
join auth.users on profiles.id = auth.users.id
where email = 'seu-email@exemplo.com';
