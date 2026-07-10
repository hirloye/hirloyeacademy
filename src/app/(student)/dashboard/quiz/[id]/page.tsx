import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { QuizProctor } from "@/components/student/QuizProctor";
import { submitAssessmentAction } from "@/app/actions/student";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("student_session")?.value;
  
  if (!sessionId) {
    redirect("/student-login");
  }

  const { id } = await params;
  const supabase = createClient(cookieStore);
  
  // Fetch assessment
  const { data: assessment, error } = await supabase
    .from("student_assessments")
    .select("*")
    .eq("id", id)
    .eq("enrollment_id", sessionId)
    .single();

  if (error || !assessment) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-500">Assessment not found.</p>
      </div>
    );
  }

  if (assessment.status === 'completed' || assessment.status === 'submitted') {
    return (
      <div className="flex flex-col h-screen items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assessment {assessment.status}</h1>
        <p className="text-gray-500">You have already taken this assessment.</p>
      </div>
    );
  }

  return <QuizProctor assessment={assessment} submitAction={submitAssessmentAction} />;
}
