-- Bazario Dashboard — Supabase schema for 2-user shared workspace
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "pgcrypto";

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Bazario',
  invite_code text not null unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table if not exists public.user_sessions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.app_records (
  id text not null,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  collection text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (workspace_id, collection, id)
);

create index if not exists app_records_workspace_collection_idx
  on public.app_records (workspace_id, collection);

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.user_sessions enable row level security;
alter table public.app_records enable row level security;

create or replace function public.is_workspace_member(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
  );
$$;

create or replace function public.create_workspace(p_name text default 'Bazario')
returns table (workspace_id uuid, invite_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  w_id uuid;
  w_code text;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  w_code := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));

  insert into public.workspaces (name, invite_code)
  values (coalesce(nullif(trim(p_name), ''), 'Bazario'), w_code)
  returning id, workspaces.invite_code into w_id, w_code;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (w_id, auth.uid(), 'admin');

  insert into public.user_sessions (user_id, workspace_id, profile)
  values (auth.uid(), w_id, '{}'::jsonb)
  on conflict (user_id) do update
    set workspace_id = excluded.workspace_id,
        updated_at = now();

  return query select w_id, w_code;
end;
$$;

create or replace function public.join_workspace(p_invite_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  w_id uuid;
  normalized text;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  normalized := upper(trim(coalesce(p_invite_code, '')));
  if normalized = '' then
    raise exception 'Invite code is required';
  end if;

  select id into w_id
  from public.workspaces
  where invite_code = normalized
  limit 1;

  if w_id is null then
    raise exception 'Invalid invite code';
  end if;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (w_id, auth.uid(), 'member')
  on conflict do nothing;

  insert into public.user_sessions (user_id, workspace_id, profile)
  values (auth.uid(), w_id, '{}'::jsonb)
  on conflict (user_id) do update
    set workspace_id = excluded.workspace_id,
        updated_at = now();

  return w_id;
end;
$$;

grant usage on schema public to authenticated;
grant execute on function public.create_workspace(text) to authenticated;
grant execute on function public.join_workspace(text) to authenticated;

-- workspaces
drop policy if exists "workspace members can read workspace" on public.workspaces;
create policy "workspace members can read workspace"
  on public.workspaces for select
  to authenticated
  using (public.is_workspace_member(id));

drop policy if exists "workspace members can update workspace settings" on public.workspaces;
create policy "workspace members can update workspace settings"
  on public.workspaces for update
  to authenticated
  using (public.is_workspace_member(id))
  with check (public.is_workspace_member(id));

-- workspace_members
drop policy if exists "members can read members in their workspace" on public.workspace_members;
create policy "members can read members in their workspace"
  on public.workspace_members for select
  to authenticated
  using (public.is_workspace_member(workspace_id));

-- user_sessions
drop policy if exists "users manage own session row" on public.user_sessions;
create policy "users manage own session row"
  on public.user_sessions for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "members can read session rows in workspace" on public.user_sessions;
create policy "members can read session rows in workspace"
  on public.user_sessions for select
  to authenticated
  using (public.is_workspace_member(workspace_id));

-- app_records
drop policy if exists "members read app records" on public.app_records;
create policy "members read app records"
  on public.app_records for select
  to authenticated
  using (public.is_workspace_member(workspace_id));

drop policy if exists "members insert app records" on public.app_records;
create policy "members insert app records"
  on public.app_records for insert
  to authenticated
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "members update app records" on public.app_records;
create policy "members update app records"
  on public.app_records for update
  to authenticated
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "members delete app records" on public.app_records;
create policy "members delete app records"
  on public.app_records for delete
  to authenticated
  using (public.is_workspace_member(workspace_id));

-- Enable Realtime for app_records in Dashboard → Database → Replication
