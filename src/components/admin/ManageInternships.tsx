"use client";

import { useState } from "react";
import { createInternship, updateInternship, deleteInternship } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Trash2, X } from "lucide-react";

export function ManageInternships({ internships }: { internships: any[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingInternship, setEditingInternship] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const formData = new FormData(e.currentTarget);
    
    let res;
    if (editingInternship) {
      res = await updateInternship(editingInternship.id, formData);
    } else {
      res = await createInternship(formData);
    }
    
    setLoading(false);
    if (res.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage(editingInternship ? "Internship updated successfully!" : "Internship created successfully!");
      setEditingInternship(null);
      (e.target as HTMLFormElement).reset();
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this internship?")) {
      await deleteInternship(id);
    }
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{editingInternship ? "Edit Internship Program" : "Add New Internship Program"}</h3>
          {editingInternship && (
            <Button type="button" variant="ghost" size="sm" onClick={() => setEditingInternship(null)}>
              <X className="w-4 h-4 mr-2" /> Cancel Edit
            </Button>
          )}
        </div>
        
        {message && <div className="p-2 text-sm bg-blue-50 text-blue-600 rounded">{message}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Program Title</label>
            <input name="title" defaultValue={editingInternship?.title} required className="w-full p-2 border rounded" placeholder="e.g. Web Development Intern" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <input name="duration" defaultValue={editingInternship?.duration} required className="w-full p-2 border rounded" placeholder="e.g. 3 Months" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Stipend</label>
            <input name="stipend" defaultValue={editingInternship?.stipend} required className="w-full p-2 border rounded" placeholder="e.g. Performance Based / Paid" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Roles and Learning Outcomes</label>
          <textarea name="roles" defaultValue={editingInternship?.roles_and_responsibilities} required rows={4} className="w-full p-2 border rounded" placeholder="What will the intern do and learn?" />
        </div>
        
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : (editingInternship ? "Update Internship" : "Create Internship")}</Button>
      </form>

      {/* Table */}
      <Card className="border-none shadow-sm bg-white dark:bg-gray-950 overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <CardTitle>Current Internships</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Stipend</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships && internships.length > 0 ? (
                internships.map((internship) => (
                  <tr key={internship.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{internship.title}</td>
                    <td className="px-6 py-4">{internship.duration}</td>
                    <td className="px-6 py-4">{internship.stipend}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingInternship(internship)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(internship.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-6 py-4 text-center">No internships found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
