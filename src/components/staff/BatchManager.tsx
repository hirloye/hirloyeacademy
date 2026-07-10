"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  assignClassToBatch, 
  assignAssignmentToBatch, 
  assignAssessmentToBatch,
  fetchStudentsByBatch,
  updateStudentAttendance,
  fetchBatchOverview
} from "@/app/actions/staff";
import { BookOpen, Presentation, FileText, CheckCircle2, Users, Loader2, Calendar as CalendarIcon, Clock, Plus, Trash2 } from "lucide-react";

export function BatchManager() {
  const [selectedBatch, setSelectedBatch] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<"class" | "assignment" | "assessment" | "students">("class");
  const [assessmentType, setAssessmentType] = useState<string>("quiz");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // State for dynamic quiz questions
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answerIndex: 0 }]);
  const addQuestion = () => setQuestions([...questions, { question: "", options: ["", "", "", ""], answerIndex: 0 }]);
  const removeQuestion = (idx: number) => {
    const newQ = [...questions];
    newQ.splice(idx, 1);
    setQuestions(newQ);
  };
  const updateQuestion = (idx: number, field: 'question' | 'answerIndex' | 'option', value: any, optIdx?: number) => {
    const newQ = [...questions];
    if (field === 'question') newQ[idx].question = value;
    if (field === 'answerIndex') newQ[idx].answerIndex = parseInt(value);
    if (field === 'option' && optIdx !== undefined) newQ[idx].options[optIdx] = value;
    setQuestions(newQ);
  };
  
  // State for students tab
  const [students, setStudents] = useState<any[]>([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [updatingStudentId, setUpdatingStudentId] = useState<string | null>(null);

  // State for batch overview
  const [overview, setOverview] = useState<{ classes: any[], assignments: any[], assessments: any[] }>({ classes: [], assignments: [], assessments: [] });
  const [fetchingOverview, setFetchingOverview] = useState(false);

  useEffect(() => {
    loadOverview();
    if (activeTab === "students") {
      loadStudents();
    }
  }, [activeTab, selectedBatch]);

  const loadOverview = async () => {
    setFetchingOverview(true);
    const data = await fetchBatchOverview(selectedBatch);
    setOverview(data);
    setFetchingOverview(false);
  };

  const loadStudents = async () => {
    setFetchingStudents(true);
    const res = await fetchStudentsByBatch(selectedBatch);
    if (res.students) {
      setStudents(res.students);
    }
    setFetchingStudents(false);
  };

  const handleAttendanceUpdate = async (studentId: string, percentage: number) => {
    setUpdatingStudentId(studentId);
    setMessage(null);
    const res = await updateStudentAttendance(studentId, percentage);
    if (res.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: "Attendance updated successfully!" });
      // Update local state to reflect change without full refetch
      setStudents(prev => prev.map(s => 
        s.id === studentId 
          ? { ...s, student_metrics: [{ attendance_percent: percentage }] } 
          : s
      ));
    }
    setUpdatingStudentId(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, action: Function) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append("batch_no", selectedBatch);
    
    // If it's an assessment and type is quiz, append our questions as JSON
    if (activeTab === "assessment" && assessmentType === "quiz") {
      formData.append("quiz_data", JSON.stringify(questions));
    }
    
    const res = await action(formData);
    
    if (res?.error) {
      setMessage({ type: 'error', text: res.error });
    } else if (res?.success) {
      setMessage({ type: 'success', text: res.message });
      (e.target as HTMLFormElement).reset();
      // Reload overview after successful assignment
      loadOverview();
    }
    
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div className="md:col-span-2 space-y-8">
        {/* Batch Selector */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Select Batch</h3>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((batch) => (
              <button
                key={batch}
                onClick={() => { setSelectedBatch(batch.toString()); setMessage(null); }}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  selectedBatch === batch.toString()
                    ? "bg-[#7B68EE] text-white shadow-md transform scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Batch {batch}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Manage Content for <span className="text-[#7B68EE]">Batch {selectedBatch}</span>
          </h3>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 flex-wrap gap-y-2">
            <button
              onClick={() => setActiveTab("class")}
              className={`flex items-center pb-3 px-4 font-medium text-sm transition-colors relative ${
                activeTab === "class" ? "text-[#7B68EE]" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Presentation className="w-4 h-4 mr-2" /> Schedule Class
              {activeTab === "class" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7B68EE] rounded-t-full" />}
            </button>
            <button
              onClick={() => setActiveTab("assignment")}
              className={`flex items-center pb-3 px-4 font-medium text-sm transition-colors relative ${
                activeTab === "assignment" ? "text-[#7B68EE]" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" /> Assign Assignment
              {activeTab === "assignment" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7B68EE] rounded-t-full" />}
            </button>
            <button
              onClick={() => setActiveTab("assessment")}
              className={`flex items-center pb-3 px-4 font-medium text-sm transition-colors relative ${
                activeTab === "assessment" ? "text-[#7B68EE]" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4 mr-2" /> Create Assessment
              {activeTab === "assessment" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7B68EE] rounded-t-full" />}
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`flex items-center pb-3 px-4 font-medium text-sm transition-colors relative ${
                activeTab === "students" ? "text-[#7B68EE]" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Users className="w-4 h-4 mr-2" /> Students & Attendance
              {activeTab === "students" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7B68EE] rounded-t-full" />}
            </button>
          </div>

          {message && (
            <div className={`p-4 mb-6 rounded-lg flex items-center space-x-3 text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-100' 
                : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Students & Attendance Tab */}
          {activeTab === "students" && (
            <div className="space-y-6">
              {fetchingStudents ? (
                <div className="flex items-center justify-center p-8 text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading students...
                </div>
              ) : students.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-gray-500">No students found in Batch {selectedBatch}.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Student Name</th>
                        <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Course / Batch</th>
                        <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Email</th>
                        <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 w-48">Attendance %</th>
                        <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 w-32">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
                      {students.map((student) => {
                        const currentAttendance = student.student_metrics?.[0]?.attendance_percent || 0;
                        return (
                          <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                              {student.first_name} {student.last_name}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                              {student.course_name}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {student.email}
                            </td>
                            <td className="px-6 py-4">
                              <form 
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const fd = new FormData(e.currentTarget);
                                  const pct = Number(fd.get("attendance"));
                                  handleAttendanceUpdate(student.id, pct);
                                }}
                                className="flex items-center space-x-2"
                              >
                                <Input 
                                  name="attendance"
                                  type="number" 
                                  min="0" 
                                  max="100" 
                                  defaultValue={currentAttendance}
                                  className="w-20 text-center"
                                  required
                                />
                                <span className="text-gray-500">%</span>
                                <Button 
                                  type="submit" 
                                  size="sm" 
                                  className="bg-[#7B68EE] hover:bg-[#6A5AE0] text-white ml-2"
                                  disabled={updatingStudentId === student.id}
                                >
                                  {updatingStudentId === student.id ? "..." : "Save"}
                                </Button>
                              </form>
                            </td>
                            <td className="px-6 py-4">
                              {currentAttendance > 80 ? (
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Good</span>
                              ) : currentAttendance > 50 ? (
                                <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Average</span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Poor</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Class Form */}
          {activeTab === "class" && (
            <form onSubmit={(e) => handleSubmit(e, assignClassToBatch)} className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject / Topic</label>
                <Input name="subject" required placeholder="e.g. SEO Fundamentals" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location or Meet Link</label>
                <Input name="location" required placeholder="e.g. Google Meet / Room 1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input name="time" required placeholder="e.g. 10:00 AM" />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="bg-[#7B68EE] hover:bg-[#6A5AE0] text-white">
                {loading ? "Assigning..." : "Assign Class to Batch"}
              </Button>
            </form>
          )}

          {/* Assignment Form */}
          {activeTab === "assignment" && (
            <form onSubmit={(e) => handleSubmit(e, assignAssignmentToBatch)} className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <label className="text-sm font-medium">Assignment Title</label>
                <Input name="title" required placeholder="e.g. Keyword Research Task" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Area</label>
                <Input name="subject" required placeholder="e.g. SEO" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <Input name="due_date" type="date" required />
              </div>
              <Button type="submit" disabled={loading} className="bg-[#7B68EE] hover:bg-[#6A5AE0] text-white">
                {loading ? "Assigning..." : "Publish Assignment"}
              </Button>
            </form>
          )}

          {/* Assessment Form */}
          {activeTab === "assessment" && (
            <form onSubmit={(e) => handleSubmit(e, assignAssessmentToBatch)} className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <label className="text-sm font-medium">Assessment Title</label>
                <Input name="title" required placeholder="e.g. Social Media Weekly Quiz" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select 
                    name="type" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                    required
                    onChange={(e) => setAssessmentType(e.target.value)}
                  >
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                    <option value="project">Project Review</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (Mins)</label>
                  <Input name="duration" type="number" required placeholder="e.g. 30" defaultValue="30" />
                </div>
              </div>
              
              {assessmentType === 'quiz' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Quiz Questions</label>
                    <Button type="button" variant="outline" size="sm" onClick={addQuestion} className="flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Add Question
                    </Button>
                  </div>
                  
                  {questions.map((q, qIdx) => (
                    <div key={qIdx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 space-y-4 relative group">
                      {questions.length > 1 && (
                        <button type="button" onClick={() => removeQuestion(qIdx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Question {qIdx + 1}</label>
                        <Input 
                          value={q.question}
                          onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                          placeholder="e.g. What does SEO stand for?" 
                          required 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name={`correct-ans-${qIdx}`} 
                              checked={q.answerIndex === optIdx}
                              onChange={() => updateQuestion(qIdx, 'answerIndex', optIdx)}
                              className="w-4 h-4 text-[#7B68EE] focus:ring-[#7B68EE]"
                              required
                            />
                            <Input 
                              value={opt}
                              onChange={(e) => updateQuestion(qIdx, 'option', e.target.value, optIdx)}
                              placeholder={`Option ${String.fromCharCode(65 + optIdx)}`} 
                              required 
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input name="date" type="date" required />
              </div>
              <Button type="submit" disabled={loading} className="bg-[#7B68EE] hover:bg-[#6A5AE0] text-white">
                {loading ? "Assigning..." : "Create Assessment"}
              </Button>
            </form>
          )}

        </div>
      </div>

      {/* Right Column: Overview */}
      <div className="md:col-span-1 border-l border-gray-100 dark:border-gray-800 md:pl-8 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
          Batch {selectedBatch} Content Overview
        </h3>
        
        {fetchingOverview ? (
          <div className="flex justify-center p-4">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Upcoming Classes */}
            <div>
              <div className="flex items-center space-x-2 mb-3 text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                <Presentation className="w-4 h-4 text-[#7B68EE]" />
                <span>Upcoming Classes</span>
              </div>
              {overview.classes.length > 0 ? (
                <div className="space-y-2">
                  {overview.classes.map((cls, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-sm border border-gray-100 dark:border-gray-800">
                      <p className="font-semibold text-gray-900 dark:text-white">{cls.subject}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                        <span className="flex items-center"><CalendarIcon className="w-3 h-3 mr-1" /> {new Date(cls.date).toLocaleDateString()}</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {cls.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No classes scheduled.</p>
              )}
            </div>

            {/* Assignments */}
            <div>
              <div className="flex items-center space-x-2 mb-3 text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#E83E8C]" />
                <span>Assignments</span>
              </div>
              {overview.assignments.length > 0 ? (
                <div className="space-y-2">
                  {overview.assignments.map((asm, idx) => (
                    <div key={idx} className="p-3 bg-[#FFF5F8]/50 dark:bg-pink-950/10 rounded-lg text-sm border border-pink-100 dark:border-pink-900/30">
                      <p className="font-semibold text-gray-900 dark:text-white">{asm.title}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {new Date(asm.due_date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No assignments created.</p>
              )}
            </div>

            {/* Assessments */}
            <div>
              <div className="flex items-center space-x-2 mb-3 text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-[#FF6B6B]" />
                <span>Assessments</span>
              </div>
              {overview.assessments.length > 0 ? (
                <div className="space-y-2">
                  {overview.assessments.map((ass, idx) => (
                    <div key={idx} className="p-3 bg-[#FFF0F0]/50 dark:bg-red-950/10 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                      <p className="font-semibold text-gray-900 dark:text-white">{ass.title} <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded uppercase">{ass.type}</span></p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(ass.date).toLocaleDateString()} • {ass.duration_mins} mins</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No assessments created.</p>
              )}
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
