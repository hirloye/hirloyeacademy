import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, CheckCircle2, Clock, ChevronLeft, ChevronDown, Edit3 } from "lucide-react";
import Link from "next/link";

export default async function StudentProgressPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("student_session")?.value;
  const supabase = createClient(cookieStore);

  const { data: student } = await supabase.from("course_enrollments").select("*").eq("id", sessionId).single();
  const { data: metrics } = await supabase.from("student_metrics").select("*").eq("enrollment_id", sessionId).single();
  const { data: activities } = await supabase.from("student_activities").select("*").eq("enrollment_id", sessionId).order("date", { ascending: false });

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Link href="/dashboard" className="text-[#4A90E2] flex items-center text-sm font-medium hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <div className="text-[#4A90E2]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Progress & Performance</h1>
      </div>

      {/* Course Selector */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm">
        <span className="text-sm text-gray-500 font-medium">Course:</span>
        <button className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white text-sm">
          <span>{student?.course_name || 'Digital Marketing Mastery'}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-950">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3 text-green-500">
              <Calendar className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">Attendance</p>
            <h3 className="text-3xl font-bold text-green-500 mb-2">{metrics?.attendance_percent || 0}%</h3>
            <p className="text-[10px] text-gray-400 font-medium">46 / 50 Days <span className="text-green-500">↑ 8%</span></p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-950">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-3 text-orange-500">
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1">Assignment</p>
            <h3 className="text-3xl font-bold text-orange-500 mb-2">{metrics?.assignments_score || 0} <span className="text-gray-400 text-xl">/ {metrics?.assignments_total || 100}</span></h3>
            <p className="text-[10px] text-gray-400 font-medium">Submitted: 8 / 10 <span className="text-green-500">↑ 12%</span></p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview Chart */}
      <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-gray-950">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
           <div className="relative w-48 h-48 mb-6 mt-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="40" className="text-gray-100 dark:text-gray-800" strokeWidth="12" stroke="currentColor" fill="transparent" />
                {/* Different segments - simplified for MVP to show overall 89% */}
                <circle cx="50" cy="50" r="40" className="text-[#4A90E2]" strokeWidth="12" strokeDasharray="180 251.2" strokeLinecap="round" stroke="currentColor" fill="transparent" />
                <circle cx="50" cy="50" r="40" className="text-[#F5A623]" strokeWidth="12" strokeDasharray="50 251.2" strokeDashoffset="-180" strokeLinecap="round" stroke="currentColor" fill="transparent" />
                <circle cx="50" cy="50" r="40" className="text-[#2ECC71]" strokeWidth="12" strokeDasharray="21 251.2" strokeDashoffset="-230" strokeLinecap="round" stroke="currentColor" fill="transparent" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-gray-400 tracking-wider">OVERALL</span>
                <span className="text-4xl font-bold text-gray-900 dark:text-white my-1">89%</span>
                <span className="text-[10px] font-bold text-[#2ECC71] uppercase tracking-wider">EXCELLENT</span>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full px-4">
             <div className="flex items-center justify-between text-xs font-medium">
               <div className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-[#2ECC71] mr-2"></span>Attendance</div>
               <span className="font-bold text-gray-900 dark:text-white">{metrics?.attendance_percent || 0}%</span>
             </div>
             <div className="flex items-center justify-between text-xs font-medium">
               <div className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-[#F5A623] mr-2"></span>Assignment</div>
               <span className="font-bold text-gray-900 dark:text-white">{metrics?.assignments_score || 0}%</span>
             </div>
             <div className="flex items-center justify-between text-xs font-medium">
               <div className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-[#4A90E2] mr-2"></span>Assessment</div>
               <span className="font-bold text-gray-900 dark:text-white">{metrics?.assessments_percent || 0}%</span>
             </div>
             <div className="flex items-center justify-between text-xs font-medium">
               <div className="flex items-center text-gray-500"><span className="w-2 h-2 rounded-full bg-[#5DADE2] mr-2"></span>Participation</div>
               <span className="font-bold text-gray-900 dark:text-white">{metrics?.participation_percent || 0}%</span>
             </div>
           </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-gray-950">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Detailed Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-[#2ECC71]" />
                Attendance
              </div>
              <span className="text-[#2ECC71]">{metrics?.attendance_percent || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#2ECC71] rounded-full" style={{ width: `${metrics?.attendance_percent || 0}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
              <span>46 / 50</span>
              <span>Target: 90%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <FileText className="w-4 h-4 mr-2 text-[#F5A623]" />
                Assignments
              </div>
              <span className="text-[#F5A623]">{metrics?.assignments_score || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#F5A623] rounded-full" style={{ width: `${metrics?.assignments_score || 0}%` }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <FileText className="w-4 h-4 mr-2 text-[#4A90E2]" />
                Assessments
              </div>
              <span className="text-[#4A90E2]">{metrics?.assessments_percent || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#4A90E2] rounded-full" style={{ width: `${metrics?.assessments_percent || 0}%` }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 mr-2 text-[#2ECC71]" />
                Grades
              </div>
              <span className="text-[#2ECC71]">91%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#2ECC71] rounded-full" style={{ width: '91%' }}></div>
            </div>
            <div className="text-[10px] text-gray-400 font-medium">Rank: 5/40</div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="font-bold text-gray-900 dark:text-white">Overall Score</span>
            <span className="font-bold text-[#4A90E2] text-lg">89 / 100</span>
          </div>

        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {activities?.map(activity => (
            <div key={activity.id} className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activity.icon_type === 'assignment' ? 'bg-green-50 text-green-500' :
                  activity.icon_type === 'assessment' ? 'bg-blue-50 text-blue-500' :
                  'bg-blue-50 text-blue-400'
                }`}>
                  {activity.icon_type === 'assignment' && <CheckCircle2 className="w-5 h-5" />}
                  {activity.icon_type === 'assessment' && <Edit3 className="w-5 h-5" />}
                  {activity.icon_type === 'attendance' && <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{activity.description}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.sub_text}</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 font-medium shrink-0">
                {Math.floor((new Date().getTime() - new Date(activity.date).getTime()) / (1000 * 3600 * 24))} days ago
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Keep Going Card */}
      <div className="bg-gradient-to-br from-[#6A4DFF] to-[#8C75FF] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Keep Going!</h3>
          <p className="text-sm text-white/80 mb-6 max-w-[200px]">You're doing great. {metrics?.course_completed_percent || 0}% course completed!</p>
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden w-4/5">
             <div className="absolute top-0 left-0 h-full bg-white rounded-full" style={{ width: `${metrics?.course_completed_percent || 0}%` }}></div>
          </div>
        </div>
        <div className="absolute right-4 bottom-4 text-3xl font-black text-white/20 tracking-tighter">
          {metrics?.course_completed_percent || 0}%
        </div>
        {/* Decorative puzzle piece vector */}
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.5,10.5H20v-4c0-1.1-0.9-2-2-2h-4V3c0-1.7-1.3-3-3-3S8,1.3,8,3v1.5H4c-1.1,0-2,0.9-2,2v4H0.5c-1.7,0-3,1.3-3,3s1.3,3,3,3H2v4c0,1.1,0.9,2,2,2h4v1.5c0,1.7,1.3,3,3,3s3-1.3,3-3V22h4c1.1,0,2-0.9,2-2v-4h1.5c1.7,0,3-1.3,3-3S23.2,10.5,21.5,10.5z" />
          </svg>
        </div>
      </div>

    </div>
  );
}
