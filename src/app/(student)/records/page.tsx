"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchMyRecords, postMyRecord } from "@/app/actions/studentRecords";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export default function StudentRecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    const res = await fetchMyRecords();
    if (res.records) {
      setRecords(res.records);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPosting(true);
    const formData = new FormData(e.currentTarget);
    const res = await postMyRecord(formData);
    
    if (res.error) {
      toast.error(res.error);
    } else if (res.success) {
      toast.success(res.message);
      (e.target as HTMLFormElement).reset();
      loadRecords();
    }
    
    setPosting(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 min-w-0">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-[#9E77ED]/10 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-[#9E77ED]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Records & Activities</h1>
          <p className="text-sm text-gray-500">Communicate with your staff and view your activity log.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="md:col-span-1">
          <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <Send className="w-4 h-4 mr-2 text-[#9E77ED]" /> New Entry
            </h4>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Input name="title" required placeholder="e.g. Assignment Submission" className="bg-gray-50 dark:bg-gray-900" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message / Details</label>
              <textarea 
                name="message" 
                required 
                placeholder="I have completed..." 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              ></textarea>
            </div>
            
            <Button type="submit" disabled={posting} className="w-full bg-[#9E77ED] hover:bg-[#8A63DB] text-white rounded-full">
              {posting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
              ) : (
                "Submit Record"
              )}
            </Button>
          </form>
        </div>

        {/* Timeline Column */}
        <div className="md:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#9E77ED]" />
            </div>
          ) : records.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No records found.</p>
              <p className="text-xs text-gray-400 mt-1">Submit your first activity record here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                  {/* Accent Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${record.sender_type === 'staff' ? 'bg-[#4A90E2]' : 'bg-[#9E77ED]'}`}></div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-bold text-gray-900 dark:text-white text-lg">{record.title}</h5>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      record.sender_type === 'staff' 
                        ? 'bg-[#E6F4FF] text-[#0066FF] border border-[#B3D4FF]' 
                        : 'bg-[#F3E8FF] text-[#9E77ED] border border-[#D8B4FE]'
                    }`}>
                      {record.sender_type === 'staff' ? 'From Staff' : 'My Submission'}
                    </span>
                  </div>
                  
                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                    {record.message}
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                    <span>{new Date(record.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
