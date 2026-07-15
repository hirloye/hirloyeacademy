import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Star, Clock, Calendar, Users, Briefcase, BookOpen } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CourseEnrollmentForm } from "@/components/course/CourseEnrollmentForm";
import LiquidGlassButton from "@/components/ui/liquid-glass-button";

export const metadata: Metadata = {
  title: "AI-Powered Digital Marketing Course in Ayanavaram | Hirloye",
  description: "Enroll in our advanced AI-powered digital marketing course in Ayanavaram. Get hands-on training, live projects, and guaranteed placement assistance with Hirloye.",
  keywords: "AI digital marketing, advanced marketing course, digital marketing Ayanavaram",
  alternates: {
    canonical: "/ai-powered-digital-marketing-course-in-ayanavaram",
    languages: {
      "en": "/ai-powered-digital-marketing-course-in-ayanavaram",
      "x-default": "/ai-powered-digital-marketing-course-in-ayanavaram",
    },
  },
};

const highlights = [
  "3 Months Intensive Training",
  "12 Weeks Structured Learning",
  "90 Hours of Instructor-Led Sessions",
  "AI-Powered Digital Marketing",
  "Live Client Projects",
  "Portfolio Development",
  "Resume & LinkedIn Optimization",
  "Freelancing Guidance",
  "Industry-Recognized Course Completion Certificate"
];

const modules = [
  {
    id: 1,
    title: "Digital Marketing Fundamentals",
    overview: "Build a strong foundation in digital marketing by understanding how businesses attract, engage, and convert customers using various online channels.",
    curriculum: ["Introduction to Digital Marketing", "Customer Journey Mapping", "Digital Marketing Channels", "Lead Generation Frameworks", "Marketing Funnel Mechanics", "Career Opportunities & Industry Trends"]
  },
  {
    id: 2,
    title: "WordPress Website Development",
    overview: "Learn to build professional business websites using WordPress while understanding website architecture, performance optimization, and lead generation.",
    curriculum: ["Domain & Hosting Management", "WordPress Setup & Installation", "Complete Website Creation", "Landing Page Design", "Lead Capture Forms", "Website Speed Optimization", "Basic SEO Architecture", "Themes & Plugins Configuration"]
  },
  {
    id: 3,
    title: "Search Engine Optimization (SEO)",
    overview: "Master modern SEO techniques to improve website visibility, increase organic traffic, and rank higher on search engines.",
    curriculum: ["Advanced Keyword Research", "On-Page SEO Optimization", "Off-Page Link Building", "Technical SEO Auditing", "Local SEO & Google Business Profile", "Google Search Console Integration", "Comprehensive SEO Audits"]
  },
  {
    id: 4,
    title: "Google Ads (SEM & Display)",
    overview: "Create and optimize high-performing Google Ads campaigns across Search, Display, YouTube, and Performance Max networks.",
    curriculum: ["Google Ads Dashboard", "Search Campaigns", "Video & YouTube Campaigns", "Performance Max (PMax)", "Smart Bidding Strategies", "Display Advertising", "Conversion Tracking Implementation"]
  },
  {
    id: 5,
    title: "Meta Ads (Facebook & Instagram)",
    overview: "Learn to run successful Facebook and Instagram advertising campaigns that generate leads, sales, and brand awareness.",
    curriculum: ["Meta Business Suite Setup", "Facebook Ads Manager", "Advanced Audience Targeting", "Instagram Campaign Creation", "Lead Generation Campaigns", "Meta Pixel Setup & Tracking"]
  },
  {
    id: 6,
    title: "Social Media Marketing (SMM)",
    overview: "Develop effective organic social media strategies to grow brands and engage audiences across multiple platforms.",
    curriculum: ["Facebook Organic Growth", "Instagram Algorithm Strategies", "LinkedIn Professional Branding", "YouTube Channel Growth", "Content Calendar Planning"]
  },
  {
    id: 7,
    title: "Email Marketing & Automation",
    overview: "Understand how to build automated email marketing systems that nurture leads and improve customer engagement.",
    curriculum: ["Email Marketing Fundamentals", "Campaign Creation & Copywriting", "Marketing Automation Workflows", "Email Deliverability Best Practices"]
  },
  {
    id: 8,
    title: "Google Analytics 4 & Search Console",
    overview: "Measure website performance, user behavior, and campaign success using Google Analytics 4 and Search Console.",
    curriculum: ["GA4 Account Setup", "Search Console Analysis", "Custom Reports & Dashboards", "Website Performance Monitoring", "Event Tracking & Conversion Analysis"]
  },
  {
    id: 9,
    title: "AI Tools for Digital Marketing",
    overview: "Leverage AI tools to improve productivity, automate marketing workflows, and create high-quality content efficiently.",
    curriculum: ["ChatGPT for Marketing", "Google Gemini Applications", "Claude for Copywriting", "Advanced Prompt Engineering", "AI Video Generation", "AI Image Creation"]
  },
  {
    id: 10,
    title: "Content Writing & Canva",
    overview: "Create compelling marketing content and professional visual designs using Canva and modern copywriting techniques.",
    curriculum: ["Copywriting Principles", "Professional Poster Design", "Social Media Content Strategy", "Canva Workspace & Design Layouts"]
  },
  {
    id: 11,
    title: "Career & Practical Placement Development",
    overview: "Prepare for employment or freelancing with portfolio development, interview preparation, and personal branding.",
    curriculum: ["Professional Resume Building", "Portfolio Development", "LinkedIn Profile Optimization", "Freelancing Setup (Upwork & Fiverr)", "Interview Preparation & Mock Interviews"]
  }
];

export default function CoursePage() {
  return (
    <div className="flex flex-col min-h-screen pb-12">
      <section className="relative py-20 overflow-hidden bg-gray-900 text-white rounded-3xl mx-4 md:mx-10 my-4 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90E2]/80 to-[#7B68EE]/80"></div>

        <div className="container relative z-10 px-6 lg:px-16 mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-medium tracking-wide">Premium Course</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              AI-Powered Digital Marketing Course in Ayanavaram
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-light">
              Join the leading digital marketing academy in Ayanavaram. Our advanced digital marketing course in Ayanavaram is a comprehensive 3-month (12-week) training program designed to prepare students for careers in modern digital marketing.
            </p>
            <div className="flex flex-wrap gap-4">
              <CourseEnrollmentForm />
              <LiquidGlassButton href="/student-login" className="h-14 px-8 text-lg">
                Student Login
              </LiquidGlassButton>
            </div>
          </div>

          <div className="hidden xl:grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center text-center">
              <Clock className="w-8 h-8 mb-3 text-white" />
              <span className="font-bold text-xl">12 Weeks</span>
              <span className="text-sm text-white/70">Course Period</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center text-center">
              <Calendar className="w-8 h-8 mb-3 text-white" />
              <span className="font-bold text-xl">4 Batches</span>
              <span className="text-sm text-white/70">Available</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center text-center">
              <Users className="w-8 h-8 mb-3 text-white" />
              <span className="font-bold text-xl">10 Members</span>
              <span className="text-sm text-white/70">Each Batch</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center text-center">
              <Briefcase className="w-8 h-8 mb-3 text-white" />
              <span className="font-bold text-xl">Live Projects</span>
              <span className="text-sm text-white/70">Practical</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          <section>
            <div className="flex items-center space-x-3 mb-10">
              <div className="p-3 bg-[#4A90E2]/10 rounded-2xl">
                <BookOpen className="w-8 h-8 text-[#4A90E2]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Course Modules</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {modules.map((mod) => (
                <div key={mod.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col items-start w-full cursor-pointer relative overflow-hidden">
                  <div className="flex items-start space-x-5 w-full relative z-10">
                    <div className="bg-gradient-to-br from-[#4A90E2] to-[#7B68EE] text-white font-bold w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                      {mod.id}
                    </div>
                    <div className="flex-1 mt-2.5">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 leading-snug">{mod.title}</h3>
                    </div>
                  </div>

                  {/* Expanded Content on Hover */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full opacity-0 group-hover:opacity-100 relative z-0">
                    <div className="overflow-hidden">
                      <div className="pt-6 pl-[68px]">
                        <div className="mb-4">
                          <h4 className="text-xs font-bold text-[#4A90E2] uppercase tracking-wider mb-2">Overview</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{mod.overview}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#4A90E2] uppercase tracking-wider mb-2">Curriculum</h4>
                          <ul className="space-y-2">
                            {mod.curriculum.map((item, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7B68EE] mt-1.5 mr-2.5 shrink-0 opacity-70"></span>
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="bg-gray-50/50 dark:bg-gray-900/30 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 sticky top-24 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Course Highlights</h2>
            <div className="space-y-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-2 rounded-xl hover:bg-white dark:hover:bg-gray-800/50 transition-colors">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-base font-medium text-gray-700 dark:text-gray-200 mt-1">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
