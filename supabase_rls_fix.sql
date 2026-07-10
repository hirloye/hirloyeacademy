-- Run this SQL in your Supabase SQL Editor to fix the RLS errors.

-- Enable Row Level Security
alter table jobs enable row level security;
alter table internships enable row level security;
alter table applications enable row level security;

-- Create permissive policies for the anon key (since we handle admin auth securely on our Next.js server)
create policy "Allow all operations on jobs" on jobs for all using (true) with check (true);
create policy "Allow all operations on internships" on internships for all using (true) with check (true);
create policy "Allow all operations on applications" on applications for all using (true) with check (true);
