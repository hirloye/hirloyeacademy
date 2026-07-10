"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { approveEnrollment, deleteEnrollment } from "@/app/actions/admin";

export function ManageEnrollments({ enrollments }: { enrollments: any[] }) {
  const [selectedEnrollment, setSelectedEnrollment] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleApprove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEnrollment) return;
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("student_email", selectedEnrollment.email); // Need this for sending email
    
    await approveEnrollment(selectedEnrollment.id, formData);
    
    setLoading(false);
    setSelectedEnrollment(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enrollment?")) return;
    setActionLoading(id);
    await deleteEnrollment(id);
    setActionLoading(null);
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold">Course Enrollments</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium">Name & Ed.</th>
              <th className="px-6 py-4 font-medium">Contact & Loc</th>
              <th className="px-6 py-4 font-medium">Course</th>
              <th className="px-6 py-4 font-medium">Amount Paid</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No enrollments found.
                </td>
              </tr>
            ) : (
              enrollments.map((enr) => (
                <tr key={enr.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {enr.first_name} {enr.last_name}
                    </div>
                    {enr.education_qualification && (
                      <div className="text-xs text-gray-500 mt-1">
                        Ed: {enr.education_qualification}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>{enr.email}</div>
                    <div className="text-xs">{enr.phone}</div>
                    {enr.location && <div className="text-xs mt-1 text-gray-400">Loc: {enr.location}</div>}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{enr.course_name}</td>
                  <td className="px-6 py-4 font-medium">
                    {enr.amount_paid > 0 ? (
                      <span className="text-green-600">₹{enr.amount_paid.toLocaleString()}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {enr.status === "approved" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Approved
                      </span>
                    ) : enr.status === "paid" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Paid
                      </span>
                    ) : enr.status === "interested" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Interested
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {enr.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {(enr.status === "pending" || enr.status === "interested" || enr.status === "paid") && (
                      <Button
                        size="sm"
                        onClick={() => setSelectedEnrollment(enr)}
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={actionLoading === enr.id}
                      onClick={() => handleDelete(enr.id)}
                    >
                      {actionLoading === enr.id ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedEnrollment} onOpenChange={(open) => !open && setSelectedEnrollment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Enrollment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApprove} className="space-y-4" key={selectedEnrollment?.id || 'empty'}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Batch Number</label>
              <Input
                name="batch_no"
                type="number"
                min="1"
                required
                placeholder="e.g. 1"
              />
              <p className="text-xs text-gray-500">The student will be grouped into this batch for classes & assignments.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Student Username</label>
              <Input
                name="student_username"
                required
                defaultValue={selectedEnrollment ? `${selectedEnrollment.first_name.toLowerCase()}.${selectedEnrollment.last_name.toLowerCase()}` : ""}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Temporary Password</label>
              <Input name="student_password" required defaultValue="hirloye123!" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry Date</label>
              <Input name="expiry_date" type="date" required />
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setSelectedEnrollment(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Approving..." : "Approve & Send Email"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
