"use client";

import { useState } from "react";
import { createInternship } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";

export function CreateInternshipForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const formData = new FormData(e.currentTarget);
    const res = await createInternship(formData);
    
    setLoading(false);
    if (res.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage("Internship program created successfully!");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold mb-4">Add New Internship Program</h3>
      {message && <div className="p-2 text-sm bg-blue-50 text-blue-600 rounded">{message}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Program Title</label>
          <input name="title" required className="w-full p-2 border rounded" placeholder="e.g. Web Development Intern" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <input name="duration" required className="w-full p-2 border rounded" placeholder="e.g. 3 Months" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stipend</label>
          <input name="stipend" required className="w-full p-2 border rounded" placeholder="e.g. Performance Based / Paid" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Roles and Learning Outcomes</label>
        <textarea name="roles" required rows={4} className="w-full p-2 border rounded" placeholder="What will the intern do and learn?" />
      </div>
      
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Create Internship"}</Button>
    </form>
  );
}
