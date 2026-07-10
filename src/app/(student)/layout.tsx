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
  GraduationCap 
} from "lucide-react";
import { logoutStudent } from "@/app/actions/studentAuth";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("student_session")?.value;

  if (!sessionId) {
    redirect("/student-login");
  }

  const supabase = createClient(cookieStore);
  const { data: student } = await supabase
    .from("course_enrollments")
    .select("first_name, last_name, course_name")
    .eq("id", sessionId)
    .single();

  if (!student) {
    redirect("/student-login");
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] dark:bg-gray-900 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 flex flex-col hidden md:flex">
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

        <nav className="flex-1 px-4 space-y-1">
          <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium text-sm">
            <LayoutDashboard className="w-4 h-4 text-[#9E77ED]" />
            <span>Dashboard</span>
          </Link>
          <Link href="/courses" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-sm transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </Link>
          <Link href="/progress" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-sm transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Progress & Performance</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-800">
          <button className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white py-2.5 rounded-full text-sm font-medium transition-colors mb-4">
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
          <Link href="/settings" className="flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <form action={logoutStudent} className="mt-2">
            <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-sm font-medium transition-colors">
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md dark:bg-gray-950/50 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
          {/* Mobile nav placeholder - leaving out for brevity but would add hamburger here */}
          <div className="flex items-center space-x-6 md:hidden">
             <span className="text-lg font-bold">ScholarDash</span>
          </div>
          <div className="hidden md:flex"></div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9E77ED] to-[#FF8A65] flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden border-2 border-white">
               {/* Just using initials as avatar */}
               {student.first_name[0]}{student.last_name[0]}
            </div>
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
