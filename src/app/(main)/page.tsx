import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hirloye | Digital Marketing Academy in Ayanavaram",
  description: "Join the top digital marketing academy in Ayanavaram. Build your career with our AI-powered digital marketing course and learn industry-focused skills at Hirloye.",
  keywords: "digital marketing academy, AI marketing course, digital marketing training",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "x-default": "/",
    },
  },
};
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MagicBento from "@/components/MagicBento";
import { EmployeeRoadmap } from "@/components/roadmap/EmployeeRoadmap";
import Hyperspeed from "@/components/Hyperspeed";
import { HeroAnimation } from "@/components/HeroAnimation";
import AnimatedGenerateButton from "@/components/ui/animated-generate-button-shadcn-tailwind";
import LiquidGlassButton from "@/components/ui/liquid-glass-button";
import {
  Monitor,
  Search,
  Share2,
  Megaphone,
  MousePointerClick,
  MapPin,
  Video,
  PenTool,
  Palette,
  Users,
  GraduationCap,
  Briefcase,
  Building
} from "lucide-react";
import { Testimonials } from "@/components/Testimonials";

const services = [
  { icon: <Monitor className="w-6 h-6 text-white" />, title: "Website Development", description: "Custom, responsive, and high-performance websites." },
  { icon: <Search className="w-6 h-6 text-white" />, title: "SEO Services", description: "Rank higher on search engines and get organic traffic." },
  { icon: <Share2 className="w-6 h-6 text-white" />, title: "Social Media Marketing", description: "Engaging campaigns to build your brand presence." },
  { icon: <Megaphone className="w-6 h-6 text-white" />, title: "Meta Ads", description: "Targeted advertising on Facebook and Instagram." },
  { icon: <MousePointerClick className="w-6 h-6 text-white" />, title: "Google Ads", description: "High-converting search and display ad campaigns." },
  { icon: <MapPin className="w-6 h-6 text-white" />, title: "Google Business Profile", description: "Optimize your local presence to attract nearby clients." },
  { icon: <Video className="w-6 h-6 text-white" />, title: "Video Production", description: "High-quality video content that tells your story." },
  { icon: <PenTool className="w-6 h-6 text-white" />, title: "Content Creation", description: "Compelling copy and visuals that drive engagement." },
  { icon: <Palette className="w-6 h-6 text-white" />, title: "Branding & Logo Design", description: "Memorable identities that stand out in the market." },
];

const stats = [
  { icon: <GraduationCap className="w-10 h-10 mb-2" />, value: "Now", label: "Enrolling Batch 1" },
  { icon: <Users className="w-10 h-10 mb-2" />, value: "Expert", label: "Industry Mentors" },
  { icon: <Building className="w-10 h-10 mb-2" />, value: "Live", label: "Client Projects" },
  { icon: <Briefcase className="w-10 h-10 mb-2" />, value: "30+", label: "Clients" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full bg-white overflow-hidden -mt-[72px] pt-[120px] pb-12 lg:pt-[136px] lg:pb-16 min-h-[100vh] md:min-h-[90vh] flex items-center justify-center">
        {/* Hyperspeed Background */}
        <div className="absolute inset-0 z-0">
          <Hyperspeed />
        </div>

        <div className="container px-4 md:px-6 relative z-10 pointer-events-none">
          <div className="grid lg:grid-cols-10 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="flex flex-col items-start space-y-8 text-left lg:col-span-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-4xl text-zinc-900 drop-shadow-xl">
                Build Your Career.<br />
                <span className="text-blue-600">Learn Digital Marketing</span><br />
              </h1>
              <p className="max-w-[700px] text-zinc-700 md:text-xl drop-shadow-md">
                Join our AI-powered digital marketing course, participate in our internship programs, and apply for top job openings.
              </p>
              <div className="flex flex-row gap-4 mt-4 pointer-events-auto">
                <Link href="/ai-powered-digital-marketing-course-in-ayanavaram" className={buttonVariants({ size: "lg" }) + " h-14 px-8 text-lg flex items-center justify-center"}>
                  Explore Course
                </Link>
                <LiquidGlassButton href="/careers" className="h-14 px-8 text-lg">
                  Apply for Jobs
                </LiquidGlassButton>
              </div>
            </div>

            {/* Right Column: Animation */}
            <div className="hidden lg:flex justify-center items-center pointer-events-auto lg:col-span-4">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive digital solutions to help your business thrive in the modern landscape.
            </p>
          </div>
          <div className="w-full max-w-6xl mx-auto">
            <MagicBento
              cards={[
                ...services.slice(0, 7).map((s, index) => {
                  let className = '';
                  let bgImage = undefined;
                  if (index === 0) className = 'bento-col-span-2';
                  if (index === 3) className = 'bento-row-span-2';
                  if (index === 4) className = 'bento-col-span-2';

                  const images = [
                    '/services/web.webp',
                    '/services/seo.webp',
                    '/services/smm.webp',
                    '/services/meta.webp',
                    '/services/google%20ads.webp',
                    '/services/gmb.webp',
                    '/services/videoshoot.webp',
                    '/services/explore.webp'

                  ];

                  bgImage = images[index];

                  return {
                    color: '#ffffff',
                    title: s.title,
                    description: s.description,
                    icon: s.icon,
                    className,
                    bgImage
                  };
                }),
                {
                  color: '#ffffff',
                  bgImage: '/services/explore.webp',
                  className: 'bento-col-span-2 flex items-center justify-center',
                  customContent: (
                    <div className="flex flex-col sm:flex-row items-center justify-center h-full gap-4 w-full p-4 relative z-10">
                      <a href="https://www.hirloye.com/best-digital-marketing-company-in-ayanavaram-services" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto text-center">
                        Explore Services
                      </a>
                      <a href="https://wa.me/917904713677" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto text-center">
                        Chat with Us
                      </a>
                    </div>
                  )
                }
              ]}
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={false}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              glowColor="74, 144, 226"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-20 bg-brand-gradient text-white relative overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                {stat.icon}
                <h4 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-md">{stat.value}</h4>
                <p className="text-lg font-medium text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmployeeRoadmap />

      <Testimonials />

      {/* CTA Section */}
      <section className="w-full py-20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Accelerate Your Journey?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Enroll in our advanced digital marketing course to upgrade your skills, and let Hirloye guide you to your perfect job.
          </p>
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-[360px] sm:max-w-[420px] mx-auto">
            <Link href="/ai-powered-digital-marketing-course-in-ayanavaram" className={buttonVariants({ size: "lg" }) + " flex-1 w-full h-14 px-2 sm:px-8 text-sm sm:text-lg flex items-center justify-center text-center"}>
              Enroll Now
            </Link>

            <LiquidGlassButton href="/careers" className="flex-1 w-full h-14 px-2 sm:px-8 text-sm sm:text-lg text-center flex items-center justify-center">
              Job Openings
            </LiquidGlassButton>
          </div>
        </div>
      </section>
    </div>
  );
}
