import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut, Users, BookOpen, Clock, AlertTriangle, Presentation } from "lucide-react";
import { logoutStaff } from "@/app/actions/staff";
import { BatchManager } from "@/components/staff/BatchManager";

import { MobileSidebar } from "@/components/MobileSidebar";
import Link from "next/link";
import { FileText, MessageSquare, CalendarIcon } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StaffDashboardPage(props: Props) {
  const searchParams = await props.searchParams;
  const tab = typeof searchParams.tab === "string" ? searchParams.tab : "overview";

  const cookieStore = await cookies();
  const isStaff = cookieStore.get("staff_session")?.value === "true";

  if (!isStaff) {
    redirect("/staff");
  }

  const navLinks = (
    <nav className="p-4 space-y-2">
      <Link href="/staff/dashboard?tab=overview" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'overview' ? 'bg-[#7B68EE]/10 text-[#7B68EE]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <Presentation className="w-5 h-5" />
        <span>Overview of the batch</span>
      </Link>
      <Link href="/staff/dashboard?tab=class" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'class' ? 'bg-[#7B68EE]/10 text-[#7B68EE]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <CalendarIcon className="w-5 h-5" />
        <span>Schedule class</span>
      </Link>
      <Link href="/staff/dashboard?tab=assignment" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'assignment' ? 'bg-[#7B68EE]/10 text-[#7B68EE]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <BookOpen className="w-5 h-5" />
        <span>Assign assignment</span>
      </Link>
      <Link href="/staff/dashboard?tab=assessment" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'assessment' ? 'bg-[#7B68EE]/10 text-[#7B68EE]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <FileText className="w-5 h-5" />
        <span>Create Assessment</span>
      </Link>
      <Link href="/staff/dashboard?tab=students" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'students' ? 'bg-[#7B68EE]/10 text-[#7B68EE]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <Users className="w-5 h-5" />
        <span>Student Attendance</span>
      </Link>
      <Link href="/staff/dashboard?tab=records" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'records' ? 'bg-[#7B68EE]/10 text-[#7B68EE]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <MessageSquare className="w-5 h-5" />
        <span>Student Records</span>
      </Link>
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Navbar for Staff */}
      <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <MobileSidebar>
            {navLinks}
          </MobileSidebar>
          <h1 className="text-xl font-bold flex items-center">
            <Users className="w-6 h-6 mr-2 text-[#7B68EE] hidden md:block" />
            Staff Portal
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <form action={logoutStaff}>
            <button type="submit" className="p-2 text-gray-500 hover:text-red-600 transition-colors flex items-center" title="Logout">
              <LogOut className="w-5 h-5 mr-1" /> <span className="hidden md:inline text-sm font-medium">Logout</span>
            </button>
          </form>
          <div className="w-8 h-8 rounded-full bg-brand-gradient text-white flex items-center justify-center font-bold text-sm">
            ST
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 hidden md:block min-h-[calc(100vh-73px)] flex-shrink-0">
          {navLinks}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 min-w-0">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div>
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, Instructor!</h2>
               <p className="text-gray-500 dark:text-gray-400">
                 Manage classes, assignments, and assessments for your assigned batches.
               </p>
             </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
            <BatchManager initialTab={tab} />
          </div>
        </main>
      </div>
    </div>
  );
}
