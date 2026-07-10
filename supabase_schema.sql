-- Run this SQL in your Supabase SQL Editor to create the necessary tables.

-- 1. Jobs Table
create table jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  location text not null,
  type text not null,
  department text not null,
  roles_and_responsibilities text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Internships Table
create table internships (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  duration text not null,
  stipend text not null,
  roles_and_responsibilities text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Applications Table
create table applications (
  id uuid default gen_random_uuid() primary key,
  type text not null, -- 'job' or 'internship'
  position_id uuid not null,
  position_title text not null,
  applicant_name text not null,
  applicant_email text not null,
  applicant_phone text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
