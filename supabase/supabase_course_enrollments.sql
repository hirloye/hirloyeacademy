-- Run this SQL in your Supabase SQL Editor to create the course_enrollments table

create table if not exists course_enrollments (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  course_name text not null,
  status text default 'pending' not null, -- 'pending', 'approved', 'rejected'
  student_username text,
  student_password text,
  expiry_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table course_enrollments enable row level security;

-- Allow anon inserts
create policy "Allow public inserts to course_enrollments" on course_enrollments for insert with check (true);

-- Allow all operations for admin/anon
create policy "Allow public operations on course_enrollments" on course_enrollments for all using (true) with check (true);
