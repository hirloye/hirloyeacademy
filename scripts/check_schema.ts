import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Checking course_enrollments:");
  const { data: enrollments } = await supabase.from('course_enrollments').select('*').limit(1);
  console.log(enrollments ? Object.keys(enrollments[0] || {}) : "No data");

  console.log("Checking student_classes:");
  const { data: classes } = await supabase.from('student_classes').select('*').limit(1);
  console.log(classes ? Object.keys(classes[0] || {}) : "No data");
}

main();
