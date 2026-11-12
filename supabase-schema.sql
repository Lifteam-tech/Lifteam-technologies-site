-- Lifteam V4 / Supabase — première structure
-- À exécuter dans Supabase SQL Editor.
-- Ne mettez jamais une service_role/secret key dans le site.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  country text,
  whatsapp text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  partner_code text not null unique,
  status text not null default 'pending' check (status in ('pending','approved','suspended','rejected','disabled')),
  level text not null default 'partner',
  commission_rate numeric(5,2) not null default 40.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partners(id) on delete set null,
  ref_code text,
  landing_page text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  product_code text not null,
  amount numeric(12,2) not null default 0,
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending','paid','cancelled','refunded')),
  affiliate_partner_id uuid references public.partners(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  rate numeric(5,2) not null,
  amount numeric(12,2) not null,
  status text not null default 'pending' check (status in ('pending','approved','paid','rejected')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.partners enable row level security;
alter table public.orders enable row level security;
alter table public.commissions enable row level security;
alter table public.affiliate_clicks enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create policy "partners_select_own" on public.partners for select using (auth.uid() = user_id);

create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);

create policy "commissions_select_own" on public.commissions for select
using (exists (
  select 1 from public.partners p
  where p.id = commissions.partner_id and p.user_id = auth.uid()
));

-- Les clics, commandes et commissions doivent être écrits/validés
-- par des fonctions backend ou des Edge Functions sécurisées.
