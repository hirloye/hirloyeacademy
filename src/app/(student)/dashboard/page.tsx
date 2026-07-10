import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MoreHorizontal, AlertTriangle, PlayCircle, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("student_session")?.value;
  const supabase = createClient(cookieStore);

  // Fetch all necessary data using the session ID (enrollment_id)
  const { data: student } = await supabase.from("course_enrollments").select("*").eq("id", sessionId).single();
  const { data: metrics } = await supabase.from("student_metrics").select("*").eq("enrollment_id", sessionId).single();
  const { data: assignments } = await supabase.from("student_assignments").select("*").eq("enrollment_id", sessionId).order("due_date", { ascending: true });
  const { data: assessments } = await supabase.from("student_assessments").select("*").eq("enrollment_id", sessionId).order("date", { ascending: true });
  const { data: classes } = await supabase.from("student_classes").select("*").eq("enrollment_id", sessionId).order("date", { ascending: true });

  const pendingAssignments = assignments?.filter(a => a.status === 'pending') || [];
  const submittedAssignments = assignments?.filter(a => a.status === 'submitted') || [];
  const completedAssignments = assignments?.filter(a => a.status === 'completed') || [];

  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Good morning, {student?.first_name}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {pendingAssignments.length > 0 
              ? `You have ${pendingAssignments.length} assignments pending.`
              : "You have no pending assignments right now."}
            {assessments && assessments.length > 0 && assessments[0].status === 'pending' && ` You have a pending ${assessments[0].title}.`}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
          <CalendarIcon className="w-4 h-4 text-[#4A90E2]" />
          <span>{todayStr}</span>
        </div>
      </div>

      {/* Main 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Attendance Card */}
        <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white dark:bg-gray-950 flex flex-col">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
               <CalendarIcon className="w-5 h-5 text-gray-400" />
               <CardTitle className="text-base font-bold">Attendance</CardTitle>
            </div>
            <span className="bg-[#E6F4FF] text-[#0066FF] text-xs font-semibold px-2 py-1 rounded-full">This Term</span>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center pt-6 pb-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="text-gray-100 dark:text-gray-800" strokeWidth="8" stroke="currentColor" fill="transparent" />
                <circle cx="50" cy="50" r="45" className="text-[#6C5CE7]" strokeWidth="8" strokeDasharray={`${(metrics?.attendance_percent || 0) * 2.83} 283`} strokeLinecap="round" stroke="currentColor" fill="transparent" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{metrics?.attendance_percent || 0}%</span>
                <span className="text-xs text-gray-500 mt-1">Present</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-8 rounded-full font-semibold">View Details</Button>
          </CardContent>
        </Card>

        {/* Assignments Card */}
        <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-950 flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
               <div className="w-5 h-5 bg-[#FDF2F8] rounded flex items-center justify-center">
                 <BookOpen className="w-3 h-3 text-[#E83E8C]" />
               </div>
               <CardTitle className="text-base font-bold">Assignments</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
               <div className="flex flex-col border-r border-gray-100 dark:border-gray-800">
                 <span className="text-2xl font-bold text-gray-700 dark:text-gray-200">{pendingAssignments.length}</span>
                 <span className="text-[10px] text-gray-400 font-semibold tracking-wider">PENDING</span>
               </div>
               <div className="flex flex-col border-r border-gray-100 dark:border-gray-800 bg-[#FFF5F8] dark:bg-pink-950/20 rounded-lg py-1">
                 <span className="text-2xl font-bold text-[#E83E8C]">{submittedAssignments.length}</span>
                 <span className="text-[10px] text-[#E83E8C] font-semibold tracking-wider">SUBMITTED</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-2xl font-bold text-green-500">{completedAssignments.length}</span>
                 <span className="text-[10px] text-green-500 font-semibold tracking-wider">COMPLETED</span>
               </div>
            </div>

            <h4 className="text-xs font-bold text-gray-400 mb-3 tracking-wider">ASSIGNMENTS</h4>
            <div className="space-y-4 flex-1">
              {assignments && assignments.length > 0 ? assignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="flex items-start space-x-3">
                  <div className={`w-1.5 h-10 rounded-full ${assignment.status === 'completed' ? 'bg-green-500' : assignment.status === 'submitted' ? 'bg-blue-400' : 'bg-[#9E77ED]'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{assignment.title}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-2">
                      <span>{assignment.subject}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 uppercase font-bold">{assignment.status}</span>
                    </div>
                  </div>
                  {assignment.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {assignment.status === 'pending' && <MoreHorizontal className="w-4 h-4 text-gray-400" />}
                </div>
              )) : (
                <div className="flex items-center justify-center h-full pb-4">
                  <p className="text-sm text-gray-500">No assignments.</p>
                </div>
              )}
            </div>

            <Button className="w-full mt-6 bg-[#E6F4FF] hover:bg-[#D0E9FF] text-[#0066FF] font-semibold rounded-full">View All Assignments</Button>
          </CardContent>
        </Card>

        {/* Assessments Card */}
        <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-950 flex flex-col">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
               <div className="w-5 h-5 bg-[#FFF0F0] rounded flex items-center justify-center">
                 <BookOpen className="w-3 h-3 text-[#FF6B6B]" />
               </div>
               <CardTitle className="text-base font-bold">Assessments</CardTitle>
            </div>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            {assessments && assessments.length > 0 ? assessments.map((assessment, idx) => (
              <div key={assessment.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 transition-colors shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#FFE5E5] text-[#FF6B6B] uppercase tracking-wider">{assessment.type}</span>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    assessment.status === 'completed' ? 'bg-green-100 text-green-700' :
                    assessment.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {assessment.status || 'pending'}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">{assessment.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{assessment.duration_mins} Mins</span>
                  </div>
                  {assessment.status === 'pending' || !assessment.status ? (
                    <Link href={`/dashboard/quiz/${assessment.id}`}>
                      <Button size="sm" className="bg-[#7B68EE] hover:bg-[#6A5AE0] text-white rounded-full px-6 h-8 text-xs font-bold animate-pulse">
                        Take Test
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="outline" className="rounded-full px-6 h-8 text-xs font-bold text-gray-500" disabled>
                      {assessment.status === 'submitted' ? 'Under Review' : 'View Results'}
                    </Button>
                  )}
                </div>
              </div>
            )) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-500">No upcoming assessments.</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Upcoming Schedule */}
      <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-950 md:col-span-1 max-w-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold">Upcoming Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-gray-200 dark:border-gray-800 ml-16 space-y-6 pb-4 mt-2">
            {classes && classes.length > 0 ? classes.map((cls, idx) => (
              <div key={cls.id} className="relative pl-6">
                <div className="absolute w-2 h-2 bg-white border-2 border-[#4A90E2] rounded-full -left-[5px] top-1.5"></div>
                <div className="absolute -left-16 top-0.5 text-xs font-bold text-gray-700 dark:text-gray-300 w-12 text-right leading-tight">
                  {cls.time.replace(/AM|PM/i, '').trim()} <br/> <span className="text-[9px] font-extrabold text-[#4A90E2]">{cls.time.toUpperCase().includes('AM') ? 'AM' : cls.time.toUpperCase().includes('PM') ? 'PM' : ''}</span>
                </div>
                <div className="bg-[#EBF5FF] dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{cls.subject}</h4>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      cls.status === 'completed' ? 'bg-green-100 text-green-700' :
                      cls.status === 'submitted' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {cls.status || 'pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{cls.location}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500 pl-6">No upcoming classes scheduled.</p>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
