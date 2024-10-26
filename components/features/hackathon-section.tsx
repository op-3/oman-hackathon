// components/features/hackathon-section.tsx
"use client";

import { motion } from "framer-motion";
import { HackathonCard } from "@/components/public/hackathon-card";

interface HackathonSectionProps {
  hackathons: any[];
  title: string;
  icon: React.ReactNode;
  gradientColors: string;
}

export function HackathonSection({
  hackathons,
  title,
  icon,
  gradientColors,
}: HackathonSectionProps) {
  if (hackathons.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 last:mb-0"
    >
      {/* Section Header */}
      <div className="relative mb-8">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientColors} blur-3xl opacity-20`}
        />
        <div className="relative flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hackathons.map((hackathon, index) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <HackathonCard hackathon={hackathon} />
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute right-0 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />
    </motion.div>
  );
}
