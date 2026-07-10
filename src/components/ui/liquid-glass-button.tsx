import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface LiquidGlassButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function LiquidGlassButton({ href, children, className }: LiquidGlassButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold tracking-wider transition-all duration-300",
        "bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20",
        "hover:bg-black/10 dark:hover:bg-white/20 hover:border-black/20 dark:hover:border-white/40",
        "shadow-lg active:scale-95",
        className
      )}
    >
      {/* Liquid gradient blobs moving inside */}
      <span className="absolute inset-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <span className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite]" />
        <span className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-[ping_3s_ease-in-out_infinite]" />
      </span>
      
      {/* Glossy reflection on top */}
      <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/20 to-transparent rounded-t-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"></span>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center drop-shadow-sm">
        {children}
      </span>
    </Link>
  );
}
