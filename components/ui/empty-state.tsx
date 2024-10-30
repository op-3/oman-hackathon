"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Button } from "./button";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-white/5 rounded-full p-6 mb-6">
        <SearchX className="w-12 h-12 text-gray-400" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        لم يتم العثور على نتائج
      </h3>

      <p className="text-gray-400 text-center max-w-md mb-8">
        لم نتمكن من العثور على أي هاكاثونات تطابق معايير البحث. حاول تغيير كلمات
        البحث أو تصفية النتائج.
      </p>

      <Button
        onClick={() => window.location.reload()}
        variant="outline"
        className="bg-white/5 border border-white/10 hover:bg-white/10"
      >
        إعادة تحميل الصفحة
      </Button>
    </motion.div>
  );
}
