"use client";

import { useEffect, useState } from "react";
import { Hackathon } from "@/lib/types";
import { HackathonCard } from "./hackathon-card";
import { getAllHackathons } from "@/lib/firebase/utils";
import toast from "react-hot-toast";

export default function HackathonGrid() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllHackathons();
        setHackathons(data || []);
      } catch (error) {
        console.error("Error loading hackathons:", error);
        setError("حدث خطأ في تحميل البيانات");
        toast.error("فشل في تحميل الهاكاثونات");
      } finally {
        setLoading(false);
      }
    };

    loadHackathons();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[400px] bg-gray-100 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-500 hover:underline"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!hackathons?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد هاكاثونات متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hackathons.map((hackathon) => (
        <HackathonCard key={hackathon.id} hackathon={hackathon} />
      ))}
    </div>
  );
}
