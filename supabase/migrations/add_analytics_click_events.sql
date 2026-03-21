alter table public.analytics_events
  add column if not exists contact_channel text,
  add column if not exists contact_value text;

alter table public.analytics_events
  drop constraint if exists analytics_events_event_type_check;

alter table public.analytics_events
  add constraint analytics_events_event_type_check
  check (event_type in ('page_view','registration','lead_contact','deal_closed','click_imovel','lead_whatsapp'));

create index if not exists analytics_events_property_id_idx on public.analytics_events (property_id);
create index if not exists analytics_events_contact_value_idx on public.analytics_events (contact_value);
