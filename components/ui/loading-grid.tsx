"use client";

import { motion } from "framer-motion";

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <LoadingCard key={i} delay={i * 0.1} />
      ))}
    </div>
  );
}

function LoadingCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10"
    >
      {/* Loading Shimmer Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite linear",
        }}
      />

      {/* Card Content */}
      <div className="relative space-y-4 p-6">
        {/* Image Placeholder */}
        <div className="aspect-[16/9] w-full bg-white/10 rounded-lg overflow-hidden">
          <div className="w-full h-full animate-pulse bg-white/5" />
        </div>

        {/* Title Placeholder */}
        <div className="h-8 bg-white/10 rounded-md animate-pulse" />

        {/* Description Placeholders */}
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
        </div>

        {/* Info Placeholders */}
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-1/3 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Buttons Placeholder */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-10 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-10 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
