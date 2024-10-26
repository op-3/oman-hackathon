"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Hackathon } from "@/lib/types";
import { HackathonCard } from "./hackathon-card";
import { getAllHackathons } from "@/lib/firebase/utils";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

export default function HackathonGrid() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    loadHackathons();
  }, []);

  const loadHackathons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllHackathons();
      setHackathons(data || []);
    } catch (error) {
      console.error("Error loading hackathons:", error);
      setError("حدث خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="h-[400px] bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse rounded-xl backdrop-blur-sm"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={loadHackathons} className="mt-4">
          <RefreshCw className="ml-2 h-4 w-4" />
          إعادة المحاولة
        </Button>
      </motion.div>
    );
  }

  if (!hackathons?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground text-lg">
          لا توجد هاكاثونات متاحة حالياً
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
    >
      <AnimatePresence>
        {hackathons.map((hackathon, index) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <HackathonCard hackathon={hackathon} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
