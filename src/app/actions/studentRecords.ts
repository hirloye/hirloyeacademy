"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function fetchMyRecords() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("student_session")?.value;
  if (!sessionId) return { records: null, error: "Not authenticated" };

  const supabase = createClient(cookieStore);

  // We need to fetch records for this specific student OR for their batch
  const { data: student } = await supabase
    .from("course_enrollments")
    .select("course_name")
    .eq("id", sessionId)
    .single();

  if (!student) return { records: null, error: "Student not found" };
  
  // Extract batch no from course_name, assuming format includes "Batch X"
  const batchMatch = student.course_name.match(/Batch\s+(\d+)/i);
  const batchNo = batchMatch ? batchMatch[1] : null;

  let query = supabase.from("student_records").select(`*, course_enrollments (first_name, last_name)`);
  
  if (batchNo) {
    query = query.or(`enrollment_id.eq.${sessionId},and(batch_id.eq.${batchNo},enrollment_id.is.null)`);
  } else {
    query = query.eq("enrollment_id", sessionId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) return { error: error.message, records: null };
  return { records: data };
}

export async function postMyRecord(formData: FormData) {
  const title = formData.get("title") as string;
  const message = formData.get("message") as string;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("student_session")?.value;
  if (!sessionId) return { error: "Not authenticated" };

  const supabase = createClient(cookieStore);

  const { data: student } = await supabase
    .from("course_enrollments")
    .select("course_name")
    .eq("id", sessionId)
    .single();

  const batchMatch = student?.course_name.match(/Batch\s+(\d+)/i);
  const batchNo = batchMatch ? batchMatch[1] : "0";

  const { error } = await supabase.from("student_records").insert({
    enrollment_id: sessionId,
    batch_id: batchNo,
    title,
    message,
    sender_type: "student"
  });

  if (error) return { error: error.message };

  revalidatePath("/records");
  return { success: true, message: "Record submitted successfully." };
}
