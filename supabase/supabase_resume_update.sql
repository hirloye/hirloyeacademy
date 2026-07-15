-- Run this script in your Supabase SQL Editor to support Resume uploads

-- 1. Add resume_url column to the applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS resume_url TEXT;

-- 2. Create the resumes storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up Storage Policies to allow public uploads (since the form is public)
CREATE POLICY "Allow public uploads to resumes bucket" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'resumes' );

CREATE POLICY "Allow public read from resumes bucket" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'resumes' );
