"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginStudent(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Please provide both username and password." };
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Note: Storing plain text passwords in course_enrollments is bad practice in production. 
  // In a real app, use Supabase Auth or hash passwords. For this MVP, we match exactly.
  const { data: enrollment, error } = await supabase
    .from("course_enrollments")
    .select("id, status, expiry_date")
    .eq("student_username", username)
    .eq("student_password", password)
    .single();

  if (error || !enrollment) {
    return { error: "Invalid username or password." };
  }

  if (enrollment.status !== "approved") {
    return { error: "Your enrollment is not approved yet." };
  }

  if (enrollment.expiry_date && new Date(enrollment.expiry_date) < new Date()) {
    return { error: "Your course access has expired." };
  }

  // Set auth cookie
  cookieStore.set("student_session", enrollment.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  redirect("/dashboard");
}

export async function logoutStudent() {
  const cookieStore = await cookies();
  cookieStore.delete("student_session");
  redirect("/student-login");
}
