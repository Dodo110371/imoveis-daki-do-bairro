create policy if not exists "admins_can_delete_events"
on public.analytics_events for delete
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);
