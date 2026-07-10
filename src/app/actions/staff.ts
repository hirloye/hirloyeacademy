"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function loginStaff(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === "hly04" && password === "2659") {
    const cookieStore = await cookies();
    cookieStore.set("staff_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    redirect("/staff/dashboard");
  }

  return { error: "Invalid staff credentials." };
}

export async function logoutStaff() {
  const cookieStore = await cookies();
  cookieStore.delete("staff_session");
  redirect("/staff");
}

export async function assignClassToBatch(formData: FormData) {
  const batchNo = formData.get("batch_no") as string;
  const subject = formData.get("subject") as string;
  const location = formData.get("location") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Find all students in this batch
  const { data: students, error: fetchError } = await supabase
    .from("course_enrollments")
    .select("id")
    .ilike("course_name", `%Batch ${batchNo}%`);

  if (fetchError || !students || students.length === 0) {
    return { error: "No students found in this batch." };
  }

  // 2. Insert class for each student
  const classesToInsert = students.map(student => ({
    enrollment_id: student.id,
    subject,
    location,
    date,
    time
  }));

  const { error } = await supabase.from("student_classes").insert(classesToInsert);

  if (error) return { error: error.message };
  
  revalidatePath("/dashboard");
  return { success: true, message: `Class assigned to ${students.length} students.` };
}

export async function assignAssignmentToBatch(formData: FormData) {
  const batchNo = formData.get("batch_no") as string;
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const dueDate = formData.get("due_date") as string;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Find all students in this batch
  const { data: students, error: fetchError } = await supabase
    .from("course_enrollments")
    .select("id")
    .ilike("course_name", `%Batch ${batchNo}%`);

  if (fetchError || !students || students.length === 0) {
    return { error: "No students found in this batch." };
  }

  // 2. Insert assignment for each student
  const assignmentsToInsert = students.map(student => ({
    enrollment_id: student.id,
    title,
    subject,
    due_date: dueDate,
    status: 'pending'
  }));

  const { error } = await supabase.from("student_assignments").insert(assignmentsToInsert);

  if (error) return { error: error.message };
  
  revalidatePath("/dashboard");
  return { success: true, message: `Assignment assigned to ${students.length} students.` };
}

function parseQuizContent(text: string) {
  const questions = [];
  const blocks = text.split(/(?=Q\d*:)/i).filter(b => b.trim().length > 0);
  
  for (const block of blocks) {
    const qMatch = block.match(/Q\d*:\s*([\s\S]*?)(?=\s*[A-D]\)|\s*Ans:)/i);
    const ansMatch = block.match(/Ans:\s*([A-D])/i);
    
    // Find all options A), B), C), D)
    const options = [];
    const optRegex = /([A-D])\)\s*([\s\S]*?)(?=\s*[A-D]\)|\s*Ans:|$)/gi;
    let match;
    while ((match = optRegex.exec(block)) !== null) {
      options.push({ letter: match[1].toUpperCase(), text: match[2].trim() });
    }
    
    if (qMatch && ansMatch && options.length >= 2) {
      const answerLetter = ansMatch[1].toUpperCase();
      const answerIndex = options.findIndex(o => o.letter === answerLetter);
      questions.push({
        question: qMatch[1].trim(),
        options: options.map(o => o.text),
        answerIndex: answerIndex !== -1 ? answerIndex : 0
      });
    }
  }
  return questions;
}

export async function assignAssessmentToBatch(formData: FormData) {
  const batchNo = formData.get("batch_no") as string;
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const date = formData.get("date") as string;
  const duration = formData.get("duration") as string;
  const quizContent = formData.get("quiz_content") as string;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Find all students in this batch
  const { data: students, error: fetchError } = await supabase
    .from("course_enrollments")
    .select("id")
    .ilike("course_name", `%Batch ${batchNo}%`);

  if (fetchError || !students || students.length === 0) {
    return { error: "No students found in this batch." };
  }

  // Parse questions if quiz
  let parsedQuestions = null;
  if (type === 'quiz') {
    const quizData = formData.get("quiz_data") as string;
    if (quizData) {
      try {
        parsedQuestions = JSON.parse(quizData);
      } catch (e) {
        return { error: "Failed to parse quiz data." };
      }
    } else if (quizContent) {
      parsedQuestions = parseQuizContent(quizContent);
    }
    
    if (!parsedQuestions || parsedQuestions.length === 0) {
      return { error: "Failed to parse quiz questions. Please check the format." };
    }
  }

  // 2. Insert assessment for each student
  const assessmentsToInsert = students.map(student => ({
    enrollment_id: student.id,
    title,
    type,
    date,
    duration_mins: parseInt(duration, 10),
    status: 'pending',
    questions: parsedQuestions
  }));

  const { error } = await supabase.from("student_assessments").insert(assessmentsToInsert);

  if (error) return { error: error.message };
  
  revalidatePath("/dashboard");
  return { success: true, message: `Assessment assigned to ${students.length} students.` };
}

export async function fetchStudentsByBatch(batchNo: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("course_enrollments")
    .select(`
      id, 
      first_name, 
      last_name, 
      email,
      course_name,
      student_metrics(attendance_percent)
    `)
    .eq("status", "approved")
    .ilike("course_name", `%Batch ${batchNo}%`)
    .order("first_name", { ascending: true });

  if (error) return { error: error.message, students: null };
  return { students: data };
}

export async function fetchBatchOverview(batchNo: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Get one approved student in the batch
  const { data: student, error: studentError } = await supabase
    .from("course_enrollments")
    .select("id")
    .eq("status", "approved")
    .ilike("course_name", `%Batch ${batchNo}%`)
    .limit(1)
    .single();

  if (studentError || !student) {
    return { classes: [], assignments: [], assessments: [] };
  }

  // 2. Fetch their content
  const [classesRes, assignmentsRes, assessmentsRes] = await Promise.all([
    supabase.from("student_classes").select("*").eq("enrollment_id", student.id).order("date", { ascending: true }),
    supabase.from("student_assignments").select("*").eq("enrollment_id", student.id).order("due_date", { ascending: true }),
    supabase.from("student_assessments").select("*").eq("enrollment_id", student.id).order("date", { ascending: true })
  ]);

  return {
    classes: classesRes.data || [],
    assignments: assignmentsRes.data || [],
    assessments: assessmentsRes.data || []
  };
}

export async function updateStudentAttendance(enrollmentId: string, percentage: number) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Check if a metrics record already exists
  const { data: existing, error: checkError } = await supabase
    .from("student_metrics")
    .select("id")
    .eq("enrollment_id", enrollmentId)
    .single();

  if (checkError && checkError.code !== "PGRST116") { // PGRST116 means no rows found
    return { error: checkError.message };
  }

  let error;
  if (existing) {
    // Update
    const { error: updateError } = await supabase
      .from("student_metrics")
      .update({ attendance_percent: percentage })
      .eq("enrollment_id", enrollmentId);
    error = updateError;
  } else {
    // Insert
    const { error: insertError } = await supabase
      .from("student_metrics")
      .insert({ 
        enrollment_id: enrollmentId, 
        attendance_percent: percentage 
      });
    error = insertError;
  }

  if (error) return { error: error.message };
  
  // Revalidate so student dashboard updates instantly
  revalidatePath("/dashboard");
  return { success: true };
}
