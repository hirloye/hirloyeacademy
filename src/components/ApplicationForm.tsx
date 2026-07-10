"use client";

import { useState } from "react";
import { createApplication } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";

interface ApplicationFormProps {
  type: "job" | "internship";
  positionId: string;
  positionTitle: string;
  onSuccess?: () => void;
}

export function ApplicationForm({ type, positionId, positionTitle, onSuccess }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    const formData = new FormData(e.currentTarget);

    const resumeFile = formData.get("resume") as File;
    if (resumeFile && resumeFile.size > 1048576) {
      setLoading(false);
      setMessage("Error: Resume file must be 1MB or smaller.");
      return;
    }

    formData.append("type", type);
    formData.append("position_id", positionId);
    formData.append("position_title", positionTitle);

    const res = await createApplication(formData);

    setLoading(false);
    if (res.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setIsSuccess(true);
      setMessage("Your application has been submitted successfully! We will contact you soon.");
      (e.target as HTMLFormElement).reset();
      if (onSuccess) {
        onSuccess();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mt-4">
      <h3 className="text-xl font-bold font-secondary">Apply for {positionTitle}</h3>
      
      {message && (
        <div className={`p-3 text-sm rounded-lg ${isSuccess ? 'bg-green-100 text-green-800 dark:bg-green-900/30' : 'bg-red-100 text-red-800 dark:bg-red-900/30'}`}>
          {message}
        </div>
      )}

      {!isSuccess && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input name="applicant_name" required className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input type="email" name="applicant_email" required className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input type="tel" name="applicant_phone" required className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent" placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Resume (PDF, DOCX)</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" required className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4A90E2]/10 file:text-[#4A90E2] hover:file:bg-[#4A90E2]/20" />
          </div>
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </>
      )}
    </form>
  );
}
