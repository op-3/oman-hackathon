"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: "blue" | "purple" | "pink";
}

export function StatsCard({
  icon,
  title,
  value,
  color = "blue",
}: StatsCardProps) {
  const getGradient = (color: string) => {
    switch (color) {
      case "purple":
        return "from-purple-500/10 to-purple-500/30";
      case "pink":
        return "from-pink-500/10 to-pink-500/30";
      default:
        return "from-blue-500/10 to-blue-500/30";
    }
  };

  const getBorderGradient = (color: string) => {
    switch (color) {
      case "purple":
        return "hover:from-purple-500 hover:to-violet-500";
      case "pink":
        return "hover:from-pink-500 hover:to-rose-500";
      default:
        return "hover:from-blue-500 hover:to-cyan-500";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradient(
          color
        )} rounded-2xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50`}
      />

      {/* Border Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent hover:opacity-100 opacity-0 transition-opacity duration-500 rounded-2xl p-[1px] ${getBorderGradient(
          color
        )}`}
      >
        <div className="absolute inset-0 bg-black rounded-2xl" />
      </div>

      {/* Content */}
      <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-white/5 rounded-full">{icon}</div>
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold">{value}</h3>
            <p className="text-sm text-gray-400">{title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
