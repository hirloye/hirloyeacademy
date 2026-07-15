import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, Building, Search } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ApplyModal } from "@/components/ApplyModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Hirloye",
  description: "Explore exciting career opportunities at Hirloye. Join our innovative digital marketing team in Ayanavaram and help shape the future of AI-powered marketing.",
  keywords: "digital marketing careers, marketing jobs Ayanavaram, work at Hirloye",
  alternates: {
    canonical: "/careers",
    languages: {
      "en": "/careers",
      "x-default": "/careers",
    },
  },
};

export default async function CareersPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch dynamic jobs from Supabase
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col min-h-screen pb-12">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#7B68EE] opacity-10 blur-[120px]"></div>
        </div>
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Join the <span className="text-gradient">Hirloye</span> Team
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            We're always looking for passionate, driven individuals to help us shape the future of digital marketing and technology.
          </p>
        </div>
      </section>

      <section className="container px-4 mx-auto max-w-4xl py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <Briefcase className="w-6 h-6 mr-3 text-[#4A90E2]" /> Open Positions
          </h2>
          <div className="relative hidden md:block w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input type="text" placeholder="Search jobs..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/50 transition-shadow" />
          </div>
        </div>

        <div className="space-y-8">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="flex flex-col gap-4">
                <Card className="glass hover:shadow-md transition-shadow border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-[#4A90E2]" /> {job.location}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-[#4A90E2]" /> {job.type}</span>
                      <span className="flex items-center"><Building className="w-4 h-4 mr-1 text-[#4A90E2]" /> {job.department}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                      <ApplyModal type="job" positionId={job.id} positionTitle={job.title} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No job openings are currently available. Please check back later!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
