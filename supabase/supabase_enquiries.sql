-- Run this SQL in your Supabase SQL Editor to create the enquiries table

create table if not exists enquiries (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table enquiries enable row level security;

-- Allow anon inserts
create policy "Allow public inserts to enquiries" on enquiries for insert with check (true);

-- Allow all operations for admin/anon
create policy "Allow public operations on enquiries" on enquiries for all using (true) with check (true);
