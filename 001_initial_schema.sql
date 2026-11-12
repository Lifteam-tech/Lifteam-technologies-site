create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text, whatsapp text, country text,
 status text not null default 'active' check(status in ('active','pending','blocked')),
 created_at timestamptz not null default now()
);
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(), slug text unique not null,
 name text not null, price numeric(12,2) not null check(price>=0),
 currency text not null default 'USD', is_digital boolean not null default true,
 status text not null default 'active' check(status in ('active','draft','archived')),
 created_at timestamptz not null default now()
);
create table if not exists public.partners (
 id uuid primary key default gen_random_uuid(),
 user_id uuid unique references auth.users(id) on delete cascade,
 partner_code text unique not null,
 status text not null default 'pending' check(status in ('pending','approved','suspended','rejected','disabled')),
 level text not null default 'Partner',
 commission_rate numeric(5,4) not null default .40 check(commission_rate between 0 and 1),
 created_at timestamptz not null default now()
);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null,
 amount numeric(12,2) not null check(amount>=0), currency text not null default 'USD',
 status text not null default 'pending' check(status in ('pending','paid','cancelled','refunded')),
 payment_reference text, created_at timestamptz not null default now()
);
create table if not exists public.order_items (
 id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
 product_id uuid not null references public.products(id), quantity integer not null default 1 check(quantity>0),
 unit_price numeric(12,2) not null check(unit_price>=0)
);
create table if not exists public.digital_entitlements (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 product_id uuid not null references public.products(id), order_id uuid references public.orders(id) on delete set null,
 status text not null default 'pending' check(status in ('pending','active','revoked','expired')),
 granted_at timestamptz, revoked_at timestamptz, unique(user_id,product_id)
);
create table if not exists public.affiliate_clicks (
 id uuid primary key default gen_random_uuid(), partner_id uuid not null references public.partners(id) on delete cascade,
 landing_path text, session_reference text, created_at timestamptz not null default now()
);
create table if not exists public.affiliate_attributions (
 id uuid primary key default gen_random_uuid(), order_id uuid unique not null references public.orders(id) on delete cascade,
 partner_id uuid not null references public.partners(id) on delete restrict,
 click_id uuid references public.affiliate_clicks(id) on delete set null,
 status text not null default 'pending' check(status in ('pending','validated','rejected')),
 created_at timestamptz not null default now()
);
create table if not exists public.commissions (
 id uuid primary key default gen_random_uuid(), order_id uuid unique not null references public.orders(id) on delete cascade,
 partner_id uuid not null references public.partners(id) on delete restrict,
 rate numeric(5,4) not null check(rate between 0 and 1), amount numeric(12,2) not null check(amount>=0),
 currency text not null default 'USD',
 status text not null default 'pending' check(status in ('pending','validated','rejected','payable','paid')),
 validated_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.payouts (
 id uuid primary key default gen_random_uuid(), partner_id uuid not null references public.partners(id) on delete restrict,
 amount numeric(12,2) not null check(amount>=0), currency text not null default 'USD',
 status text not null default 'pending' check(status in ('pending','processing','paid','failed')),
 payment_reference text, paid_at timestamptz, created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.partners enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.digital_entitlements enable row level security;
alter table public.affiliate_clicks enable row level security;
alter table public.affiliate_attributions enable row level security;
alter table public.commissions enable row level security;
alter table public.payouts enable row level security;

create policy "products_public_read" on public.products for select to anon, authenticated using(status='active');
create policy "profiles_select_own" on public.profiles for select to authenticated using((select auth.uid())=id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check((select auth.uid())=id);
create policy "profiles_update_own" on public.profiles for update to authenticated using((select auth.uid())=id) with check((select auth.uid())=id);
create policy "orders_select_own" on public.orders for select to authenticated using((select auth.uid())=user_id);
create policy "entitlements_select_own" on public.digital_entitlements for select to authenticated using((select auth.uid())=user_id);
create policy "partners_select_own" on public.partners for select to authenticated using((select auth.uid())=user_id);
create policy "commissions_select_own" on public.commissions for select to authenticated
using(partner_id in (select p.id from public.partners p where p.user_id=(select auth.uid())));

-- Sensitive state changes (orders, attributions, commissions, payouts, entitlements)
-- remain server-side; no client INSERT/UPDATE policies are created here.
