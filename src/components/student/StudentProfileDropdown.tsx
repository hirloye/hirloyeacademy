"use client";

import { useState } from "react";
import { LogOut, BookOpen } from "lucide-react";
import { logoutStudent } from "@/app/actions/studentAuth";

interface StudentProps {
  firstName: string;
  lastName: string;
  email?: string;
  courseName: string;
}

export function StudentProfileDropdown({ firstName, lastName, email, courseName }: StudentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9E77ED] to-[#FF8A65] flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden border-2 border-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9E77ED] focus:ring-offset-2 transition-transform hover:scale-105"
      >
        {firstName[0]}{lastName[0]}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
              <p className="font-bold text-gray-900 dark:text-white truncate">
                {firstName} {lastName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {email || "Student"}
              </p>
            </div>
            
            <div className="p-2 space-y-1">
              <div className="flex items-start p-2 text-sm text-gray-700 dark:text-gray-300">
                <BookOpen className="w-4 h-4 mr-3 mt-0.5 text-[#9E77ED] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Enrolled Course</span>
                  <span className="font-medium">{courseName}</span>
                </div>
              </div>
            </div>
            
            <div className="p-2 border-t border-gray-100 dark:border-gray-800">
              <form action={logoutStudent}>
                <button 
                  type="submit"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
