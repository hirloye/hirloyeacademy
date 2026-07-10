import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Code, Rocket, Megaphone } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ApplyModal } from "@/components/ApplyModal";

export default async function InternshipsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch dynamic internships from Supabase
  const { data: internships } = await supabase
    .from("internships")
    .select("*")
    .order("created_at", { ascending: false });

  // Map icons based on title loosely, fallback to Rocket
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('marketing') || t.includes('seo')) return <Megaphone className="w-8 h-8" />;
    if (t.includes('dev') || t.includes('web')) return <Code className="w-8 h-8" />;
    return <Rocket className="w-8 h-8" />;
  };

  return (
    <div className="flex flex-col min-h-screen pb-12">
      <section className="text-center py-20 px-4">
        <div className="inline-flex items-center justify-center p-4 bg-[#7B68EE]/10 rounded-full mb-6">
          <GraduationCap className="w-12 h-12 text-[#7B68EE]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Launch Your Career with an <span className="text-gradient">Internship</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Get hands-on experience, mentorship from industry experts, and build a strong portfolio to kickstart your professional journey.
        </p>
      </section>

      <section className="container px-4 mx-auto max-w-5xl">
        <div className="space-y-12">
          {internships && internships.length > 0 ? (
            internships.map((internship) => (
              <div key={internship.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <Card className="glass border-t-4 border-t-[#4A90E2] h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-6 text-[#4A90E2] self-start">
                      {getIcon(internship.title)}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{internship.title}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 space-y-2">
                      <p><strong>Duration:</strong> {internship.duration}</p>
                      <p><strong>Stipend:</strong> {internship.stipend}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 w-full flex justify-end">
                      <ApplyModal type="internship" positionId={internship.id} positionTitle={internship.title} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No internship programs are currently open. Please check back later!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
