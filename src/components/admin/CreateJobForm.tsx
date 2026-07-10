"use client";

import { useState } from "react";
import { createJob } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";

export function CreateJobForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const formData = new FormData(e.currentTarget);
    const res = await createJob(formData);
    
    setLoading(false);
    if (res.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage("Job created successfully!");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold mb-4">Add New Job Position</h3>
      {message && <div className="p-2 text-sm bg-blue-50 text-blue-600 rounded">{message}</div>}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Job Title</label>
          <input name="title" required className="w-full p-2 border rounded" placeholder="e.g. Senior Developer" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <input name="location" required className="w-full p-2 border rounded" placeholder="e.g. Remote / On-site" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <select name="type" className="w-full p-2 border rounded">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Department</label>
          <input name="department" required className="w-full p-2 border rounded" placeholder="e.g. Engineering" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Roles and Responsibilities</label>
        <textarea name="roles" required rows={4} className="w-full p-2 border rounded" placeholder="Describe the day-to-day responsibilities and requirements..." />
      </div>
      
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Create Job"}</Button>
    </form>
  );
}
