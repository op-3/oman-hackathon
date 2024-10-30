"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const { language } = useLanguage();

  return (
    <motion.div whileHover={{ y: -5 }} className="relative group">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

      {/* Glowing Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(45deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3))",
          padding: "1px",
        }}
      >
        <div className="absolute inset-0 bg-black rounded-2xl" />
      </motion.div>

      {/* Card Content */}
      <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-full">
        <div className="space-y-6">
          {/* Icon */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center"
            >
              <div className="text-white group-hover:text-blue-400 transition-colors duration-300">
                {icon}
              </div>
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-center text-white">{title}</h3>

          {/* Description */}
          <p className="text-gray-400 text-center text-sm leading-relaxed">
            {description}
          </p>

          {/* Subtle Arrow Decoration */}
          <div
            className={`absolute bottom-4 ${
              language === "ar" ? "left-4" : "right-4"
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-blue-500/50"
            >
              {language === "ar" ? "→" : "←"}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
