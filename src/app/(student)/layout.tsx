import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { 
  Bell, 
  HelpCircle, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Settings, 
  Plus, 
  MessageSquare,
  GraduationCap
} from "lucide-react";
import { logoutStudent } from "@/app/actions/studentAuth";
import { StudentProfileDropdown } from "@/components/student/StudentProfileDropdown";
import { StudentNavLinks } from "@/components/student/StudentNavLinks";

import { MobileSidebar } from "@/components/MobileSidebar";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("student_session")?.value;

  if (!sessionId) {
    redirect("/student-login");
  }

  const supabase = createClient(cookieStore);
  const { data: student } = await supabase
    .from("course_enrollments")
    .select("first_name, last_name, course_name, email")
    .eq("id", sessionId)
    .single();

  if (!student) {
    redirect("/student-login");
  }

  const sidebarContent = (
    <>
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 text-[#9E77ED]" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">ScholarDash</span>
        </Link>
        <div className="mt-8 flex items-center space-x-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">Premium Academy</p>
              <p className="text-[10px] text-gray-500">Student Portal</p>
            </div>
        </div>
      </div>

      <StudentNavLinks />

      <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-800">
        <form action={logoutStudent} className="mt-2">
          <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-sm font-medium transition-colors">
            Log out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#F8F9FA] dark:bg-gray-900 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 flex-col hidden md:flex">
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white/50 backdrop-blur-md dark:bg-gray-950/50 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3 md:hidden">
             <MobileSidebar>{sidebarContent}</MobileSidebar>
             <span className="text-lg font-bold text-gray-900 dark:text-white">ScholarDash</span>
          </div>
          <div className="hidden md:flex"></div>
          
          <div className="flex items-center space-x-3 md:space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden md:block p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <StudentProfileDropdown 
              firstName={student.first_name}
              lastName={student.last_name}
              email={student.email}
              courseName={student.course_name}
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
