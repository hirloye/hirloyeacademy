import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, BarChart3, TrendingUp, LogOut, Briefcase, GraduationCap, FileText, BookOpen } from "lucide-react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { logoutAdmin } from "@/app/actions/auth";
import { ManageJobs } from "@/components/admin/ManageJobs";
import { ManageInternships } from "@/components/admin/ManageInternships";
import { ManageEnrollments } from "@/components/admin/ManageEnrollments";
import { MobileSidebar } from "@/components/MobileSidebar";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminDashboard(props: Props) {
  const searchParams = await props.searchParams;
  const tab = typeof searchParams.tab === "string" ? searchParams.tab : "overview";

  const navLinks = (
    <nav className="p-4 space-y-2">
      <Link href="/admin?tab=overview" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'overview' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <BarChart3 className="w-5 h-5" />
        <span>Overview</span>
      </Link>
      <Link href="/admin?tab=leads" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'leads' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <Users className="w-5 h-5" />
        <span>Applications / Leads</span>
      </Link>
      <Link href="/admin?tab=enquiries" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'enquiries' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <FileText className="w-5 h-5" />
        <span>Enquiries</span>
      </Link>
      <Link href="/admin?tab=jobs" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'jobs' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <Briefcase className="w-5 h-5" />
        <span>Manage Jobs</span>
      </Link>
      <Link href="/admin?tab=interns" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'interns' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <GraduationCap className="w-5 h-5" />
        <span>Manage Internships</span>
      </Link>
      <Link href="/admin?tab=enrollments" scroll={false} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${tab === 'enrollments' ? 'bg-[#4A90E2]/10 text-[#4A90E2]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <BookOpen className="w-5 h-5" />
        <span>Course Enrollments</span>
      </Link>
    </nav>
  );

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch all required data dynamically
  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
    
  const { data: jobs } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
  const { data: internships } = await supabase.from("internships").select("*").order("created_at", { ascending: false });
  const { data: enquiries } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(20);
  const { data: courseEnrollments } = await supabase.from("course_enrollments").select("*").order("created_at", { ascending: false });

  // Stats
  const { count: jobAppsCount } = await supabase.from("applications").select("*", { count: "exact", head: true }).eq("type", "job");
  const { count: internAppsCount } = await supabase.from("applications").select("*", { count: "exact", head: true }).eq("type", "internship");
  const { count: enquiriesCount } = await supabase.from("enquiries").select("*", { count: "exact", head: true });

  const totalApplications = (jobAppsCount || 0) + (internAppsCount || 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar for Admin */}
      <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-4 px-6 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <MobileSidebar>
            {navLinks}
          </MobileSidebar>
          <h1 className="text-xl font-bold flex items-center">
            <Settings className="w-6 h-6 mr-2 text-[#4A90E2] hidden md:block" />
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <form action={logoutAdmin}>
            <button type="submit" className="p-2 text-gray-500 hover:text-red-600 transition-colors flex items-center" title="Logout">
              <LogOut className="w-5 h-5 mr-1" /> <span className="hidden md:inline text-sm font-medium">Logout</span>
            </button>
          </form>
          <div className="w-8 h-8 rounded-full bg-brand-gradient text-white flex items-center justify-center font-bold text-sm">
            AD
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 hidden md:block min-h-[calc(100vh-73px)]">
          {navLinks}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 min-w-0">
          <div className="mb-8 flex items-center justify-between">
             <h2 className="text-2xl font-bold">Welcome back, Admin!</h2>
          </div>

          {/* Conditional Rendering Based on Tab */}
          {tab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-none shadow-sm bg-white dark:bg-gray-950">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Applications</p>
                    <h3 className="text-2xl font-bold">{totalApplications}</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white dark:bg-gray-950">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Job Applications</p>
                    <h3 className="text-2xl font-bold">{jobAppsCount || 0}</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white dark:bg-gray-950">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Intern Apps</p>
                    <h3 className="text-2xl font-bold">{internAppsCount || 0}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === "jobs" && (
            <div className="mb-8 max-w-4xl">
              <ManageJobs jobs={jobs || []} />
            </div>
          )}

          {tab === "interns" && (
            <div className="mb-8 max-w-4xl">
              <ManageInternships internships={internships || []} />
            </div>
          )}

          {tab === "enrollments" && (
            <div className="mb-8 max-w-6xl">
              <ManageEnrollments enrollments={courseEnrollments || []} />
            </div>
          )}

          {tab === "enquiries" && (
            <Card className="border-none shadow-sm bg-white dark:bg-gray-950 overflow-hidden max-w-6xl">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <CardTitle>Recent Enquiries</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Contact Info</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4 whitespace-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries && enquiries.length > 0 ? (
                      enquiries.map((enq) => (
                        <tr key={enq.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {enq.first_name} {enq.last_name}
                          </td>
                          <td className="px-6 py-4">
                            <a href={`mailto:${enq.email}`} className="text-[#4A90E2] hover:underline">{enq.email}</a>
                          </td>
                          <td className="px-6 py-4 font-medium whitespace-nowrap">{enq.subject}</td>
                          <td className="px-6 py-4 max-w-xs truncate" title={enq.message}>
                            {enq.message}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(enq.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No enquiries found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {tab === "leads" && (
            <Card className="border-none shadow-sm bg-white dark:bg-gray-950 overflow-hidden max-w-6xl">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <CardTitle>Recent Applications & Leads</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Contact Info</th>
                      <th className="px-6 py-4">Position</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Resume</th>
                      <th className="px-6 py-4">Date applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications && applications.length > 0 ? (
                      applications.map((app) => (
                        <tr key={app.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {app.applicant_name}
                          </td>
                          <td className="px-6 py-4">
                            <div>{app.applicant_email}</div>
                            <div className="text-xs text-gray-400">{app.applicant_phone}</div>
                          </td>
                          <td className="px-6 py-4 font-medium">{app.position_title}</td>
                          <td className="px-6 py-4">
                            {app.type === "job" ? (
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Job</span>
                            ) : (
                              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Internship</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {app.resume_url ? (
                              <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="text-[#4A90E2] hover:underline flex items-center text-xs">
                                View Resume
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(app.created_at).toLocaleDateString()} {new Date(app.created_at).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No applications found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
