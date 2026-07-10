"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitAssessmentAction(assessmentId: string, payload: { answers: any, terminated: boolean }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // In a real scenario, we might grade the answers here if we want to store 'score'
  // But for now, we just mark as submitted and optionally log if it was terminated early
  
  const { error } = await supabase
    .from("student_assessments")
    .update({ 
      status: "submitted"
      // we could add a `student_answers` JSONB column later to store `payload.answers`
    })
    .eq("id", assessmentId);

  if (error) {
    console.error("Failed to submit assessment:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
