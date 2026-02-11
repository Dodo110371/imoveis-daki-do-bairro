-- Script para criar um usuário Admin via SQL (Supabase)
-- Execute este script no SQL Editor do Supabase

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_email text := 'admin@imoveisdobairro.com'; -- Email do admin
  v_password text := 'admin123';               -- Senha temporária
  v_user_id uuid;
BEGIN
  -- 1. Verifica se o usuário já existe
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_email;
  
  IF v_user_id IS NULL THEN
    -- 2. Gera um novo ID
    v_user_id := gen_random_uuid();
    
    -- 3. Insere o usuário na tabela de autenticação (auth.users)
    -- Nota: Isso simula o que a API de Auth faz
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      v_email,
      crypt(v_password, gen_salt('bf')),
      now(), -- Confirma o email automaticamente
      null,
      null,
      '{"provider": "email", "providers": ["email"]}',
      json_build_object('full_name', 'Admin'),
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
    
    -- 4. O trigger 'on_auth_user_created' deve rodar e criar o perfil em public.profiles
    -- Porém, ele cria com role='user'. Vamos atualizar para 'admin'.
    
    UPDATE public.profiles
    SET role = 'admin'
    WHERE id = v_user_id;
    
    RAISE NOTICE 'Usuário admin criado: % (Senha: %)', v_email, v_password;
    
  ELSE
    -- Se já existe, apenas promove e avisa
    UPDATE public.profiles
    SET role = 'admin'
    WHERE id = v_user_id;
    
    RAISE NOTICE 'Usuário % já existia. Promovido a admin.', v_email;
    RAISE NOTICE 'Nota: A senha NÃO foi alterada se o usuário já existia.';
  END IF;
END $$;
