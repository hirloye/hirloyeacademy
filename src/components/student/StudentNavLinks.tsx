"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, MessageSquare } from "lucide-react";

export function StudentNavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/progress", label: "Progress & Performance", icon: Calendar },
    { href: "/records", label: "Records", icon: MessageSquare },
  ];

  return (
    <nav className="flex-1 px-4 space-y-1">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        const Icon = link.icon;
        
        return (
          <Link 
            key={link.href}
            href={link.href} 
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              isActive 
                ? "bg-gray-100 dark:bg-gray-800 text-[#9E77ED]" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-[#9E77ED]" : ""}`} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
