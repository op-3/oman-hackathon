"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAllHackathons } from "@/lib/firebase/admin";
import { HackathonCard } from "@/components/public/hackathon-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, CalendarClock } from "lucide-react";
import toast from "react-hot-toast";

export default function HomePage() {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    loadHackathons();
  }, []);

  const loadHackathons = async () => {
    try {
      setLoading(true);
      const data = await getAllHackathons();
      const sortedData = sortHackathons(data);
      setHackathons(sortedData);
      setFilteredHackathons(sortedData);
    } catch (error) {
      console.error("Error loading hackathons:", error);
      toast.error("حدث خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const sortHackathons = (hackathons: any[]) => {
    return [...hackathons].sort((a, b) => {
      const statusOrder = {
        upcoming: 0,
        ongoing: 1,
        completed: 2,
      };

      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;

      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  };

  useEffect(() => {
    let filtered = [...hackathons];

    if (searchTerm) {
      filtered = filtered.filter(
        (h) =>
          h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter !== "all") {
      filtered = filtered.filter((h) => h.status === activeFilter);
    }

    setFilteredHackathons(sortHackathons(filtered));
  }, [searchTerm, activeFilter, hackathons]);

  const renderHackathonSection = (status: string, title: string) => {
    const hackathons = filteredHackathons.filter((h) => h.status === status);
    if (hackathons.length === 0) return null;

    return (
      <div className="mb-16 last:mb-0">
        <h2 className="text-2xl font-bold mb-8 text-white">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon, index) => (
            <div
              key={hackathon.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <HackathonCard hackathon={hackathon} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              هاكاثونات عُمان
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              اكتشف أحدث وأهم الهاكاثونات في سلطنة عُمان
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative" data-aos="fade-up">
              <Search className="absolute right-4 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="ابحث عن هاكاثون..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white/10 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
              />
            </div>

            <div
              className="flex flex-wrap gap-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {[
                { value: "all", label: "الكل" },
                { value: "upcoming", label: "قادم" },
                { value: "ongoing", label: "جاري" },
                { value: "completed", label: "منتهي" },
              ].map(({ value, label }) => (
                <Button
                  key={value}
                  variant={activeFilter === value ? "default" : "outline"}
                  onClick={() => setActiveFilter(value)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hackathons Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          ) : filteredHackathons.length > 0 ? (
            <>
              {renderHackathonSection("upcoming", "الهاكاثونات القادمة")}
              {renderHackathonSection("ongoing", "الهاكاثونات الجارية")}
              {renderHackathonSection("completed", "الهاكاثونات المنتهية")}
            </>
          ) : (
            <div className="text-center py-16">
              <CalendarClock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300">
                لا توجد هاكاثونات متطابقة مع بحثك
              </h3>
              <p className="text-gray-400 mt-2">
                جرب تغيير معايير البحث أو الفلترة
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 bg-black/50">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
