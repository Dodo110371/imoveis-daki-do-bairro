-- Add address fields to profiles
alter table public.profiles
add column if not exists address text,
add column if not exists city text,
add column if not exists state text,
add column if not exists zip_code text,
add column if not exists phone text;

-- Create avatars bucket
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage Policies (Drop first to avoid conflicts)
drop policy if exists "Avatar images are publicly accessible" on storage.objects;
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.uid() = owner );

drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
  on storage.objects for update
  using ( bucket_id = 'avatars' and auth.uid() = owner );

drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
  on storage.objects for delete
  using ( bucket_id = 'avatars' and auth.uid() = owner );

-- Function to allow users to delete their own account
create or replace function delete_own_account()
returns void as $$
begin
  -- Delete profile first (optional if cascade is set, but good for clarity)
  delete from public.profiles where id = auth.uid();
  -- Delete auth user
  delete from auth.users where id = auth.uid();
end;
$$ language plpgsql security definer;
