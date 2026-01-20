-- MindMirror Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  avatar_url text,
  subscription_status text default 'free' check (subscription_status in ('free', 'premium', 'cancelled')),
  subscription_id text,
  subscription_end_date timestamp with time zone,
  settings jsonb default '{
    "trackCycle": false,
    "trackSleep": true,
    "trackHealth": true,
    "periodStartDate": null,
    "averageCycleLength": 28,
    "notificationsEnabled": false,
    "notificationTime": "20:00"
  }'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Entries table
create table public.entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event text,
  category text,
  thought text,
  feelings text[] default '{}',
  other_feeling text,
  intensity integer default 5 check (intensity >= 1 and intensity <= 10),
  health jsonb default '{
    "cycleDay": "",
    "cyclePhase": "",
    "sleep": "",
    "factors": [],
    "otherFactor": ""
  }'::jsonb,
  voice_note_url text,
  voice_note_duration integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for faster queries
create index entries_user_id_idx on public.entries(user_id);
create index entries_created_at_idx on public.entries(created_at desc);
create index entries_user_created_idx on public.entries(user_id, created_at desc);
create index entries_category_idx on public.entries(category);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.entries enable row level security;

-- Profiles policies
create policy "Users can view own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

-- Entries policies
create policy "Users can view own entries" 
  on public.entries for select 
  using (auth.uid() = user_id);

create policy "Users can create own entries" 
  on public.entries for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own entries" 
  on public.entries for update 
  using (auth.uid() = user_id);

create policy "Users can delete own entries" 
  on public.entries for delete 
  using (auth.uid() = user_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to update updated_at
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
