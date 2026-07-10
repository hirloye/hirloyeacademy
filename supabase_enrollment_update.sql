-- Run this in your Supabase SQL editor to update the course_enrollments table

-- 1. Add new columns
ALTER TABLE course_enrollments
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS education_qualification text,
ADD COLUMN IF NOT EXISTS amount_paid numeric DEFAULT 0;

-- 2. No constraints need to be dropped for status as it defaults to 'pending'
-- It now supports: 'interested', 'paid', 'approved', 'rejected', 'pending'

-- Ensure anon roles can still update their own records if they have the ID (optional, depending on your RLS)
-- Since your policy allows all operations on course_enrollments for public, no new policy is required.
