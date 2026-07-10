"use client";

import { useState } from "react";
import { createJob, updateJob, deleteJob } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Trash2, X } from "lucide-react";

export function ManageJobs({ jobs }: { jobs: any[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingJob, setEditingJob] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const formData = new FormData(e.currentTarget);
    
    let res;
    if (editingJob) {
      res = await updateJob(editingJob.id, formData);
    } else {
      res = await createJob(formData);
    }
    
    setLoading(false);
    if (res.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage(editingJob ? "Job updated successfully!" : "Job created successfully!");
      setEditingJob(null);
      (e.target as HTMLFormElement).reset();
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
    }
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{editingJob ? "Edit Job Position" : "Add New Job Position"}</h3>
          {editingJob && (
            <Button type="button" variant="ghost" size="sm" onClick={() => setEditingJob(null)}>
              <X className="w-4 h-4 mr-2" /> Cancel Edit
            </Button>
          )}
        </div>
        
        {message && <div className="p-2 text-sm bg-blue-50 text-blue-600 rounded">{message}</div>}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <input name="title" defaultValue={editingJob?.title} required className="w-full p-2 border rounded" placeholder="e.g. Senior Developer" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <input name="location" defaultValue={editingJob?.location} required className="w-full p-2 border rounded" placeholder="e.g. Remote / On-site" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select name="type" defaultValue={editingJob?.type || "Full-time"} className="w-full p-2 border rounded">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <input name="department" defaultValue={editingJob?.department} required className="w-full p-2 border rounded" placeholder="e.g. Engineering" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Roles and Responsibilities</label>
          <textarea name="roles" defaultValue={editingJob?.roles_and_responsibilities} required rows={4} className="w-full p-2 border rounded" placeholder="Describe the day-to-day responsibilities and requirements..." />
        </div>
        
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : (editingJob ? "Update Job" : "Create Job")}</Button>
      </form>

      {/* Table */}
      <Card className="border-none shadow-sm bg-white dark:bg-gray-950 overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <CardTitle>Current Job Openings</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{job.title}</td>
                    <td className="px-6 py-4">{job.location}</td>
                    <td className="px-6 py-4">{job.department}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingJob(job)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(job.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-6 py-4 text-center">No jobs found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
