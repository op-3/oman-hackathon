"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
}

export function SocialLink({ href, icon, className }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "relative group p-3 bg-white/5 rounded-full transition-all duration-300",
        "hover:bg-white/10 hover:text-blue-400",
        className
      )}
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md" />
      </div>

      {/* Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      {/* Content */}
      <div className="relative">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.a>
  );
}
