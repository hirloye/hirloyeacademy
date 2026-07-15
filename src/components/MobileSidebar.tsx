"use client";

import { useState, ReactNode, useEffect, Suspense } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

function SidebarContent({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button 
        className="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Open Mobile Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="relative w-72 max-w-xs h-full bg-white dark:bg-gray-950 shadow-2xl overflow-y-auto flex flex-col transform transition-transform border-r border-gray-100 dark:border-gray-800">
            <div className="p-4 flex items-center justify-end border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function MobileSidebar({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="w-10 h-10 md:hidden" />}>
      <SidebarContent>{children}</SidebarContent>
    </Suspense>
  );
}
