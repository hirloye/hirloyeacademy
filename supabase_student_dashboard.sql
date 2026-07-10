-- Run this SQL in your Supabase SQL Editor to create the student dashboard tables

create table if not exists student_assignments (
  id uuid default gen_random_uuid() primary key,
  enrollment_id uuid references course_enrollments(id) on delete cascade,
  title text not null,
  subject text not null,
  due_date timestamp with time zone not null,
  status text not null, -- 'pending', 'done', 'overdue'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists student_assessments (
  id uuid default gen_random_uuid() primary key,
  enrollment_id uuid references course_enrollments(id) on delete cascade,
  title text not null,
  type text not null, -- e.g., 'quiz', 'mid-term'
  date timestamp with time zone not null,
  duration_mins integer not null,
  status text not null, -- 'upcoming', 'completed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists student_classes (
  id uuid default gen_random_uuid() primary key,
  enrollment_id uuid references course_enrollments(id) on delete cascade,
  time text not null, -- e.g., '09:00 AM'
  subject text not null,
  location text not null,
  date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists student_activities (
  id uuid default gen_random_uuid() primary key,
  enrollment_id uuid references course_enrollments(id) on delete cascade,
  description text not null,
  sub_text text,
  date timestamp with time zone not null,
  icon_type text not null, -- 'assignment', 'assessment', 'attendance'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists student_metrics (
  id uuid default gen_random_uuid() primary key,
  enrollment_id uuid references course_enrollments(id) on delete cascade unique,
  attendance_percent integer default 0,
  assignments_score integer default 0,
  assignments_total integer default 100,
  assessments_percent integer default 0,
  participation_percent integer default 0,
  course_completed_percent integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table student_assignments enable row level security;
alter table student_assessments enable row level security;
alter table student_classes enable row level security;
alter table student_activities enable row level security;
alter table student_metrics enable row level security;

-- Allow public operations for ease of MVP
create policy "Allow public operations on student_assignments" on student_assignments for all using (true) with check (true);
create policy "Allow public operations on student_assessments" on student_assessments for all using (true) with check (true);
create policy "Allow public operations on student_classes" on student_classes for all using (true) with check (true);
create policy "Allow public operations on student_activities" on student_activities for all using (true) with check (true);
create policy "Allow public operations on student_metrics" on student_metrics for all using (true) with check (true);

-- Optional: Function to seed dummy data for an enrollment
CREATE OR REPLACE FUNCTION seed_student_data(p_enrollment_id UUID)
RETURNS void AS $$
BEGIN
  -- Insert Metrics
  INSERT INTO student_metrics (enrollment_id, attendance_percent, assignments_score, assignments_total, assessments_percent, participation_percent, course_completed_percent)
  VALUES (p_enrollment_id, 92, 88, 100, 86, 90, 78)
  ON CONFLICT (enrollment_id) DO NOTHING;

  -- Insert Assignments
  INSERT INTO student_assignments (enrollment_id, title, subject, due_date, status) VALUES
  (p_enrollment_id, 'World Literature Essay', 'English', NOW() + INTERVAL '2 days', 'pending'),
  (p_enrollment_id, 'Lab Report: Thermodynamics', 'Physics', NOW() + INTERVAL '4 days', 'pending'),
  (p_enrollment_id, 'Modern Art History Quiz', 'Arts', NOW() - INTERVAL '1 day', 'overdue');

  -- Insert Assessments
  INSERT INTO student_assessments (enrollment_id, title, type, date, duration_mins, status) VALUES
  (p_enrollment_id, 'Atomic Structure Quiz', 'meta ads', NOW() + INTERVAL '1 day', 45, 'upcoming'),
  (p_enrollment_id, 'Calculus Mid-Term', 'google ads', NOW() + INTERVAL '3 days', 90, 'upcoming'),
  (p_enrollment_id, 'The Industrial Revolution', 'example', NOW() + INTERVAL '5 days', 30, 'upcoming');

  -- Insert Classes
  INSERT INTO student_classes (enrollment_id, time, subject, location, date) VALUES
  (p_enrollment_id, '09:00 AM', 'Advanced Math', 'Room 302 - Prof. Miller', NOW()),
  (p_enrollment_id, '11:30 AM', 'Biology Lab', 'Science Wing - Lab B', NOW()),
  (p_enrollment_id, '02:00 PM', 'Creative Writing', 'Arts Center - Studio 1', NOW());

  -- Insert Activities
  INSERT INTO student_activities (enrollment_id, description, sub_text, date, icon_type) VALUES
  (p_enrollment_id, 'Assignment 3 Submitted', 'Social Media Strategy', NOW() - INTERVAL '2 days', 'assignment'),
  (p_enrollment_id, 'Assessment 2 Completed', 'SEO Fundamentals Quiz', NOW() - INTERVAL '5 days', 'assessment'),
  (p_enrollment_id, 'Attendance Marked', 'Present on May 28', NOW() - INTERVAL '6 days', 'attendance');

END;
$$ LANGUAGE plpgsql;
