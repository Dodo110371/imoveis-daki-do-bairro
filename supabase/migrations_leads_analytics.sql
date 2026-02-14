-- Analytics & Leads events table
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('page_view','registration','lead_contact','deal_closed')),
  user_id uuid null,
  property_id uuid null,
  path text null,
  created_at timestamp with time zone default now()
);

-- Indexes
create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at);
create index if not exists analytics_events_event_type_idx on public.analytics_events (event_type);

-- RLS
alter table public.analytics_events enable row level security;

-- Allow anyone (anon/authenticated) to insert basic events
create policy if not exists "anyone_can_insert_events"
on public.analytics_events for insert
to public
with check ( true );

-- Allow admins to read all events
create policy if not exists "admins_can_read_all_events"
on public.analytics_events for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- Optional: owners can read their own events (if user_id is set)
create policy if not exists "users_can_read_own_events"
on public.analytics_events for select
to authenticated
using ( user_id = auth.uid() );
