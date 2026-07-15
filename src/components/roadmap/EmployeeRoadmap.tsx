"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const roles = [
  { title: "Brand Ambassador", image: "/employee_profile/BrandAmbassador.jpeg", color: "from-pink-500 to-rose-500", shadow: "shadow-pink-500/50" },
  { title: "Business Development Executive", image: "/employee_profile/BDE.jpeg", color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/50" },
  { title: "Website Developer", image: "/employee_profile/Website_Developer.png", color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/50" },
  { title: "Digital Marketing Executive", image: "/employee_profile/Digital_Marketing_Executive.jpeg", color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/50" },
  { title: "SEO Analyst", image: "/employee_profile/SEO_Analyst.jpeg", color: "from-indigo-500 to-purple-500", shadow: "shadow-indigo-500/50" },
  { title: "Relationship Manager", image: "/employee_profile/Relationship_Manager.jpeg", color: "from-rose-500 to-pink-500", shadow: "shadow-rose-500/50" },
];

export function EmployeeRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress percentage 0 to 100
      const startDraw = windowHeight * 0.8;
      let progress = 0;

      if (rect.top < startDraw) {
        progress = ((startDraw - rect.top) / rect.height) * 100;
      }

      setLineProgress(Math.max(0, Math.min(progress, 100)));
    };

    // Animation observer for nodes
    const nodeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-[30px]");
          entry.target.classList.add("opacity-100", "translate-y-0");
          nodeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const nodes = document.querySelectorAll('.roadmap-node');
    nodes.forEach(node => nodeObserver.observe(node));

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      nodeObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-[#030014]/50">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-20 roadmap-node opacity-0 translate-y-[30px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 mb-4">
            Pillars of Hirloye
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Our growing ecosystem. Replace these placeholder avatars with your real team photos!
          </p>
        </div>

        <div className="relative mt-8 md:mt-24" ref={containerRef}>
          {/* Desktop Horizontal Line (Wavy) */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden md:block h-12">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 48">
              <defs>
                <linearGradient id="roadmap-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
                  <stop offset="50%" stopColor="#3b82f6" /> {/* blue-500 */}
                  <stop offset="100%" stopColor="#ec4899" /> {/* pink-500 */}
                </linearGradient>
              </defs>

              {/* Background Path */}
              <path
                d="M 0,24 Q 100,40 200,24 T 400,24 T 600,24 T 800,24 T 1000,24 T 1200,24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200 dark:text-gray-800"
              />

              {/* Foreground Animated Path */}
              <path
                d="M 0,24 Q 100,40 200,24 T 400,24 T 600,24 T 800,24 T 1000,24 T 1200,24"
                fill="none"
                stroke="url(#roadmap-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
                style={{
                  strokeDasharray: 1250,
                  strokeDashoffset: 1250 - (lineProgress / 100) * 1250
                }}
              />
            </svg>
          </div>

          {/* Mobile Vertical Line */}
          <div className="absolute left-[3rem] top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-800 rounded-full md:hidden -translate-x-1/2"></div>
          <div
            className="absolute left-[3rem] top-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 rounded-full md:hidden -translate-x-1/2 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(132,0,255,0.5)]"
            style={{ height: `${lineProgress}%` }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-y-8 md:gap-y-0 relative z-10">
            {roles.map((role, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`roadmap-node opacity-0 translate-y-[30px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] relative flex flex-row md:flex-col items-center w-full delay-${(index % 3) * 100}`}>

                  {/* Top Card (Desktop only, alternated) */}
                  <div className={`hidden md:flex w-full h-[160px] flex-col justify-end pb-6 ${isEven ? 'invisible' : ''}`}>
                    <div className="bg-white dark:bg-gray-900/80 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm text-center mx-1 hover:-translate-y-1 transition-transform duration-300">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{role.title}</h3>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0 mx-4 md:mx-0 relative z-10 hover:z-50">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${role.color} p-1 ${role.shadow} shadow-lg group hover:scale-[2] transition-transform duration-300`}>
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-950 overflow-hidden relative border-2 border-white dark:border-gray-900">
                        <img
                          src={role.image}
                          alt={role.title}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card (Desktop, alternated) & Mobile Card */}
                  <div className={`flex flex-1 md:w-full md:h-[160px] flex-col justify-start md:pt-6 ${!isEven ? 'md:invisible' : ''}`}>
                    <div className={`bg-white dark:bg-gray-900/80 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm text-left md:text-center mr-4 md:mr-0 md:mx-1 hover:translate-y-1 transition-transform duration-300 ${!isEven && 'md:hidden'}`}>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{role.title}</h3>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

