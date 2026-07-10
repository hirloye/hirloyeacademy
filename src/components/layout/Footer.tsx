import Link from "next/link";
import { Megaphone, BarChart, MousePointerClick, Target } from "lucide-react";
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
      {/* Animated Digital Marketing Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15] dark:opacity-[0.08]">
        <div className="absolute top-10 left-[5%] md:left-[10%] animate-bounce text-[#4A90E2]">
          <Megaphone className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <div className="absolute bottom-10 right-[5%] md:right-[15%] animate-pulse text-[#7B68EE]" style={{ animationDuration: '3s' }}>
          <BarChart className="w-20 h-20 md:w-32 md:h-32" />
        </div>
        <div className="absolute top-20 right-[25%] md:right-[30%] animate-bounce text-[#ec4899]" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <MousePointerClick className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <div className="absolute bottom-20 left-[20%] md:left-[25%] animate-pulse text-blue-500" style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <Target className="w-24 h-24 md:w-36 md:h-36" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 relative z-10">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Hirloye Logo" className="h-20 w-auto" />
              <span className="self-center text-2xl font-bold whitespace-nowrap text-gradient font-secondary">
                Hirloye
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Build your career, learn digital marketing, and grow with our professional training and internship programs.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Services</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://www.hirloye.com/best-digital-marketing-company-in-ayanavaram-google-my-business" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#4A90E2]">GMB</a>
                </li>
                <li className="mb-4">
                  <a href="https://www.hirloye.com/best-digital-marketing-company-in-ayanavaram-meta-google-ads" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#4A90E2]">Meta & Google Ads</a>
                </li>
                <li className="mb-4">
                  <a href="https://www.hirloye.com/best-digital-marketing-company-in-ayanavaram-website-development" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#4A90E2]">Website Development</a>
                </li>
                <li className="mb-4">
                  <a href="https://www.hirloye.com/best-digital-marketing-company-in-ayanavaram-video-shoot-editing" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#4A90E2]">Video Shoot and Edit</a>
                </li>
                <li className="mb-4">
                  <a href="https://www.hirloye.com/best-digital-marketing-company-in-ayanavaram-seo-services" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#4A90E2]">SEO</a>
                </li>
                <li>
                  <a href="https://www.hirloye.com/best-digital-marketing-company-in-ayanavaram-social-media-management" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#4A90E2]">Social Media Marketing</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Learn</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/course" className="hover:underline hover:text-[#4A90E2]">Digital Marketing</Link>
                </li>
                <li>
                  <Link href="/internships" className="hover:underline hover:text-[#4A90E2]">Internships</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline hover:text-[#4A90E2]">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-[#4A90E2]">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()} <Link href="/" className="hover:underline hover:text-[#4A90E2]">Hirloye™</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5 text-gray-500 dark:text-gray-400">
            <a href="https://www.facebook.com/Hirloye" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A90E2] transition-colors">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="https://www.instagram.com/hirloye" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A90E2] transition-colors">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="https://www.linkedin.com/company/hirloye" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A90E2] transition-colors">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
