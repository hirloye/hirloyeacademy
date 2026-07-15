-- Create the student_records table for two-way communication between staff and students
CREATE TABLE IF NOT EXISTS public.student_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id UUID REFERENCES public.course_enrollments(id) ON DELETE CASCADE,
    batch_id TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('staff', 'student')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.student_records ENABLE ROW LEVEL SECURITY;

-- Optional: Create basic policies (adjust as needed for your specific auth setup)
-- Allow anyone to read for now (you should restrict this to authenticated users in production)
CREATE POLICY "Enable read access for all users" ON public.student_records FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.student_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.student_records FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.student_records FOR DELETE USING (true);
