"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import AnimatedGenerateButton from "@/components/ui/animated-generate-button-shadcn-tailwind";

type NavLink = {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { 
    name: "Career", 
    subLinks: [
      { name: "Full-time", href: "/careers" },
      { name: "Internship", href: "/internships" }
    ]
  },
  { name: "Digital Marketing Course", href: "/course" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  return (
    <nav className="fixed w-full z-50 top-0 start-0 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm dark:bg-black/50 dark:border-white/10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => setIsOpen(false)}>
          <img src="/logo.png" alt="Hirloye Logo" className="h-16 w-auto" />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-gradient font-secondary">
            Hirloye
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <AnimatedGenerateButton 
            className="hidden md:inline-block h-10"
            labelIdle="Explore Course"
            labelActive="Loading..."
            onClick={() => router.push('/course')}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50/50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800/50 md:dark:bg-transparent dark:border-gray-700">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.subLinks ? (
                  <>
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4A90E2] md:p-0 md:dark:hover:text-[#4A90E2] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors"
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : 'group-hover:rotate-180'}`} />
                    </button>
                    {/* Dropdown menu */}
                    <div className={`md:absolute left-0 md:top-full md:pt-4 w-full md:w-44 transition-all z-50 ${openDropdown === link.name ? 'block mt-2' : 'hidden md:group-hover:block'}`}>
                      <div className="rounded-md md:shadow-lg bg-white/90 md:bg-white dark:bg-gray-900/90 md:dark:bg-gray-900 md:border border-gray-100 dark:border-gray-800 overflow-hidden py-2" role="menu" aria-orientation="vertical">
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#4A90E2] dark:hover:text-[#4A90E2] transition-colors"
                            onClick={() => {
                              setIsOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href!}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4A90E2] md:p-0 md:dark:hover:text-[#4A90E2] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenDropdown(null);
                    }}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
