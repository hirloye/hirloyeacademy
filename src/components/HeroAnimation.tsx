"use client";

import { motion } from "framer-motion";
import { Megaphone, Monitor, Search, Share2, BarChart, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const items = [
    { icon: Megaphone, color: "text-orange-500", bg: "bg-orange-100", delay: 0 },
    { icon: Monitor, color: "text-blue-500", bg: "bg-blue-100", delay: 0.2 },
    { icon: Search, color: "text-green-500", bg: "bg-green-100", delay: 0.4 },
    { icon: Share2, color: "text-purple-500", bg: "bg-purple-100", delay: 0.6 },
    { icon: BarChart, color: "text-pink-500", bg: "bg-pink-100", delay: 0.8 },
  ];

  const radius = 150;

  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      {/* Central Hub */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-10 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-blue-500"
      >
        <Rocket className="w-12 h-12 text-blue-600" />
      </motion.div>

      {/* Orbiting Elements */}
      {items.map((item, index) => {
        const Icon = item.icon;
        const angle = (index * 360) / items.length;
        const angleRad = (angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x, y }}
            transition={{ type: "spring", stiffness: 50, damping: 10, delay: item.delay }}
            className="absolute"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
              className={`w-16 h-16 ${item.bg} rounded-2xl shadow-xl flex items-center justify-center`}
            >
              <Icon className={`w-8 h-8 ${item.color}`} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Outer rotating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[380px] h-[380px] border-2 border-dashed border-gray-200 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute w-[260px] h-[260px] border border-gray-100 rounded-full pointer-events-none"
      />
    </div>
  );
}
