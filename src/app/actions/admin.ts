"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Add a Job
export async function createJob(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const department = formData.get("department") as string;
  const roles = formData.get("roles") as string;

  const { data, error } = await supabase.from("jobs").insert([
    {
      title,
      location,
      type,
      department,
      roles_and_responsibilities: roles,
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/careers");
  revalidatePath("/admin");
  return { success: true };
}

// Update a Job
export async function updateJob(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const department = formData.get("department") as string;
  const roles = formData.get("roles") as string;

  const { data, error } = await supabase.from("jobs").update({
    title,
    location,
    type,
    department,
    roles_and_responsibilities: roles,
  }).eq('id', id);

  if (error) return { error: error.message };

  revalidatePath("/careers");
  revalidatePath("/admin");
  return { success: true };
}

// Delete a Job
export async function deleteJob(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("jobs").delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath("/careers");
  revalidatePath("/admin");
  return { success: true };
}


// Add an Internship
export async function createInternship(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const stipend = formData.get("stipend") as string;
  const roles = formData.get("roles") as string;

  const { data, error } = await supabase.from("internships").insert([
    {
      title,
      duration,
      stipend,
      roles_and_responsibilities: roles,
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/internships");
  revalidatePath("/admin");
  return { success: true };
}

// Update an Internship
export async function updateInternship(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const stipend = formData.get("stipend") as string;
  const roles = formData.get("roles") as string;

  const { data, error } = await supabase.from("internships").update({
    title,
    duration,
    stipend,
    roles_and_responsibilities: roles,
  }).eq('id', id);

  if (error) return { error: error.message };

  revalidatePath("/internships");
  revalidatePath("/admin");
  return { success: true };
}

// Delete an Internship
export async function deleteInternship(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("internships").delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath("/internships");
  revalidatePath("/admin");
  return { success: true };
}


// Add an Application (Public route)
export async function createApplication(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const type = formData.get("type") as string;
  const position_id = formData.get("position_id") as string;
  const position_title = formData.get("position_title") as string;
  const applicant_name = formData.get("applicant_name") as string;
  const applicant_email = formData.get("applicant_email") as string;
  const applicant_phone = formData.get("applicant_phone") as string;
  const resumeFile = formData.get("resume") as File;

  let resume_url = null;

  // Handle Resume Upload if a file was provided
  if (resumeFile && resumeFile.size > 0) {
    const fileExt = resumeFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, resumeFile);

    if (uploadError) {
      return { error: `Failed to upload resume: ${uploadError.message}` };
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(uploadData.path);
      
    resume_url = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase.from("applications").insert([
    {
      type,
      position_id,
      position_title,
      applicant_name,
      applicant_email,
      applicant_phone,
      resume_url,
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { success: true };
}

// Submit Enquiry (Contact Form)
import { Resend } from 'resend';

export async function submitEnquiry(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // 1. Save to Supabase Database
  const { data, error } = await supabase.from("enquiries").insert([
    {
      first_name,
      last_name,
      email,
      subject,
      message,
    },
  ]);

  if (error) return { error: `Database Error: ${error.message}` };

  // 2. Send Email via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Hirloye Website <onboarding@resend.dev>', // Resend testing domain default
        to: 'raghavhirloye@gmail.com', // Updated to client's requested email
        subject: `New Enquiry: ${subject} from ${first_name} ${last_name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${first_name} ${last_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br />')}</p>
        `
      });

      if (emailError) {
        console.error("Resend API Error:", emailError);
        return { error: `Enquiry saved, but email failed: ${emailError.message}` };
      }
    } catch (err: any) {
      console.error("Failed to execute Resend request:", err);
      return { error: `Enquiry saved, but email request crashed: ${err.message}` };
    }
  } else {
    console.warn("RESEND_API_KEY is not defined. Email was not sent, but enquiry is saved in DB.");
    return { error: "Enquiry saved, but email failed: Missing RESEND_API_KEY in .env.local" };
  }

  revalidatePath("/admin");
  return { success: true };
}

// Course Enrollments Actions

export async function submitCourseEnrollment(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const course_name = formData.get("course_name") as string || "Digital Marketing Certification";

  const { data, error } = await supabase.from("course_enrollments").insert([
    {
      first_name,
      last_name,
      email,
      phone,
      location,
      course_name,
      status: "interested"
    },
  ]).select();

  if (error) return { error: `Database Error: ${error.message}` };

  revalidatePath("/admin");
  return { success: true, id: data[0].id };
}

export async function processCoursePayment(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const education_qualification = formData.get("education_qualification") as string;
  const amount_paid = formData.get("amount_paid") as string;

  const { data, error } = await supabase.from("course_enrollments").update({
    status: "paid",
    education_qualification,
    amount_paid: Number(amount_paid) || 0,
  }).eq('id', id);

  if (error) return { error: error.message };

  revalidatePath("/course");
  revalidatePath("/admin");
  return { success: true };
}

export async function approveEnrollment(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const student_username = formData.get("student_username") as string;
  const student_password = formData.get("student_password") as string;
  const expiry_date = formData.get("expiry_date") as string;
  const student_email = formData.get("student_email") as string;
  const batch_no = formData.get("batch_no") as string;

  // Fetch current course name to append batch
  const { data: currentEnr } = await supabase.from("course_enrollments").select("course_name").eq("id", id).single();
  const baseCourseName = currentEnr?.course_name?.split(' - Batch')[0] || "Digital Marketing Certification";
  const course_name_with_batch = `${baseCourseName} - Batch ${batch_no}`;

  const { data, error } = await supabase.from("course_enrollments").update({
    status: "approved",
    student_username,
    student_password,
    expiry_date,
    course_name: course_name_with_batch,
  }).eq('id', id);

  if (error) return { error: error.message };

  // Send Email with credentials via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && student_email) {
    const resend = new Resend(resendApiKey);
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Hirloye Courses <onboarding@resend.dev>', // Resend testing domain default
        to: student_email, // Send to the student's email
        subject: `Your Course Enrollment is Approved!`,
        html: `
          <h3>Welcome to Hirloye Courses!</h3>
          <p>Your enrollment has been approved by the admin.</p>
          <p>Here are your student dashboard credentials. Keep them safe.</p>
          <ul>
            <li><strong>Username:</strong> ${student_username}</li>
            <li><strong>Password:</strong> ${student_password}</li>
            <li><strong>Valid Until:</strong> ${new Date(expiry_date).toLocaleDateString()}</li>
          </ul>
          <p>We will notify you once the student dashboard is live.</p>
        `
      });

      if (emailError) {
        console.error("Resend API Error:", emailError);
      }
    } catch (err: any) {
      console.error("Failed to execute Resend request:", err);
    }
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteEnrollment(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("course_enrollments").delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { success: true };
}
