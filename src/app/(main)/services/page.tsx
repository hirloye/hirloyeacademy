import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Search, Share2, Megaphone, MousePointerClick, MapPin, Video, PenTool, Palette, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: <Monitor className="w-10 h-10 mb-4 text-[#4A90E2]" />, title: "Website Development", description: "Custom, responsive, and high-performance websites tailored to your brand." },
  { icon: <Search className="w-10 h-10 mb-4 text-[#7B68EE]" />, title: "SEO Services", description: "Rank higher on search engines and attract organic, high-quality traffic." },
  { icon: <Share2 className="w-10 h-10 mb-4 text-[#4A90E2]" />, title: "Social Media Marketing", description: "Engaging campaigns to build your brand presence across all platforms." },
  { icon: <Megaphone className="w-10 h-10 mb-4 text-[#7B68EE]" />, title: "Meta Ads", description: "Targeted advertising on Facebook and Instagram for maximum ROI." },
  { icon: <MousePointerClick className="w-10 h-10 mb-4 text-[#4A90E2]" />, title: "Google Ads", description: "High-converting search and display ad campaigns to capture intent." },
  { icon: <MapPin className="w-10 h-10 mb-4 text-[#7B68EE]" />, title: "Google Business Profile", description: "Optimize your local presence to attract nearby clients effectively." },
  { icon: <Video className="w-10 h-10 mb-4 text-[#4A90E2]" />, title: "Video Production", description: "High-quality video content that tells your brand story compellingly." },
  { icon: <PenTool className="w-10 h-10 mb-4 text-[#7B68EE]" />, title: "Content Creation", description: "Compelling copy and visuals that drive engagement and conversions." },
  { icon: <Palette className="w-10 h-10 mb-4 text-[#4A90E2]" />, title: "Branding & Logo Design", description: "Memorable identities that stand out in the crowded market." },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] left-[10%] w-[50%] h-[50%] rounded-full bg-[#4A90E2] opacity-10 blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#7B68EE] opacity-10 blur-[100px]"></div>
        </div>
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Empower your business with our comprehensive suite of digital marketing and development services designed to drive growth and maximize ROI.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="glass hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-800 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-[#7B68EE]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 flex flex-col items-start relative z-10 h-full">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6 inline-block">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-[#4A90E2] hover:text-[#7B68EE] transition-colors mt-auto group-hover:underline">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
