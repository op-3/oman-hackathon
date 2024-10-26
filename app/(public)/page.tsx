"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAllHackathons } from "@/lib/firebase/admin";
import { HackathonCard } from "@/components/public/hackathon-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParticleBackground } from "@/components/features/particle-background"; // أضف هذا الاستيراد
import { TypingEffect } from "@/components/features/typing-effect"; // أضف هذا أيضاً
import {
  Search,
  Filter,
  CalendarClock,
  ChevronDown,
  Code,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle,
  Calendar,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/parallax";
import { cn } from "@/lib/utils";
import { StatsCard } from "@/components/features/stats-card";
import { FilterButton } from "@/components/ui/filter-button";
import { LoadingGrid } from "@/components/ui/loading-grid";
import { FeatureCard } from "@/components/features/feature-card";
import { SocialLink } from "@/components/ui/social-link";
import { FeaturedHackathonCard } from "@/components/features/featured-hackathon-card";
import { HackathonSection } from "@/components/features/hackathon-section";

export default function HomePage() {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 150]);

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
    loadHackathons();
  }, []);

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
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-20" // أضفنا py-20 للتأكد من وجود مساحة كافية
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent" />
          <div className="relative w-full h-full">
            <ParticleBackground />
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title with padding bottom */}
            <div className="relative inline-block mb-12">
              {" "}
              {/* أضفنا mb-12 للمسافة */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-20 rounded-full"
              />
              <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-50 to-purple-50 leading-loose">
                {" "}
                {/* أضفنا leading-loose */}
                هاكاثونات عُمان
              </h1>
            </div>

            {/* Subtitle with Typing Effect */}
            <TypingEffect
              texts={[
                "اكتشف أحدث الهاكاثونات",
                "طور مهاراتك البرمجية",
                "شارك في المنافسات",
                "اصنع مستقبلك التقني",
              ]}
              className="text-xl md:text-3xl text-gray-300"
            />

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
            >
              <StatsCard
                icon={<Code className="w-6 h-6" />}
                title="الهاكاثونات النشطة"
                value={
                  hackathons.filter((h) => h.status !== "completed").length
                }
                color="blue"
              />
              <StatsCard
                icon={<Users className="w-6 h-6" />}
                title="المشاركون"
                value="1000+"
                color="purple"
              />
              <StatsCard
                icon={<Trophy className="w-6 h-6" />}
                title="المشاريع المنجزة"
                value="50+"
                color="pink"
              />
            </motion.div>

            {/* Scroll Indicator - تم تحريكه إلى الأسفل */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50" // تم تغيير absolute إلى fixed وإضافة z-50
            >
              <ChevronDown className="w-8 h-8 text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      {/* Featured Hackathons Slider */}
      <section className="py-20 bg-gradient-to-b from-black/50 to-transparent relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 inline-flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              الهاكاثونات المميزة
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              تصفح أبرز الهاكاثونات المتاحة حالياً واكتشف فرص جديدة للتعلم
              والمنافسة
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, EffectFade, Parallax]}
            effect="fade"
            parallax={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full max-w-5xl mx-auto"
            spaceBetween={30}
          >
            {hackathons
              .filter((h) => h.status !== "completed")
              .slice(0, 5)
              .map((hackathon) => (
                <SwiperSlide key={hackathon.id}>
                  <FeaturedHackathonCard hackathon={hackathon} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </section>
      {/* Search & Filter Section */}
      <section ref={searchRef} className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Search Input */}
            <div
              className={cn(
                "relative transition-all duration-300",
                isSearchFocused ? "transform scale-105" : ""
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-white/5 border border-white/10 rounded-lg shadow-xl backdrop-blur-xl">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن هاكاثون..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-4 pr-12 py-4 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 text-lg"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {[
                { value: "all", label: "الكل", icon: Filter },
                { value: "upcoming", label: "قادم", icon: Calendar },
                { value: "ongoing", label: "جاري", icon: Play },
                { value: "completed", label: "منتهي", icon: CheckCircle },
              ].map(({ value, label, icon: Icon }) => (
                <FilterButton
                  key={value}
                  active={activeFilter === value}
                  onClick={() => setActiveFilter(value)}
                  icon={<Icon className="w-4 h-4" />}
                >
                  {label}
                </FilterButton>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Hackathons Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingGrid />
            ) : filteredHackathons.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Upcoming Hackathons */}
                <HackathonSection
                  hackathons={filteredHackathons.filter(
                    (h) => h.status === "upcoming"
                  )}
                  title="الهاكاثونات القادمة"
                  icon={<Calendar className="w-6 h-6 text-blue-400" />}
                  gradientColors="from-blue-400/20 to-blue-600/20"
                />

                {/* Ongoing Hackathons */}
                <HackathonSection
                  hackathons={filteredHackathons.filter(
                    (h) => h.status === "ongoing"
                  )}
                  title="الهاكاثونات الجارية"
                  icon={<Play className="w-6 h-6 text-green-400" />}
                  gradientColors="from-green-400/20 to-green-600/20"
                />

                {/* Completed Hackathons */}
                <HackathonSection
                  hackathons={filteredHackathons.filter(
                    (h) => h.status === "completed"
                  )}
                  title="الهاكاثونات المنتهية"
                  icon={<CheckCircle className="w-6 h-6 text-gray-400" />}
                  gradientColors="from-gray-400/20 to-gray-600/20"
                />
              </motion.div>
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              لماذا تشارك في الهاكاثونات؟
            </h2>
            <p className="text-gray-400">
              اكتشف الفوائد العديدة للمشاركة في الهاكاثونات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="تطوير المهارات"
              description="تحسين مهاراتك البرمجية وتعلم تقنيات جديدة"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="بناء العلاقات"
              description="التواصل مع مطورين آخرين وبناء شبكة علاقات مهنية"
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="المنافسة والجوائز"
              description="فرصة للفوز بجوائز قيمة وتحقيق إنجازات مميزة"
            />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">هاكاثونات عُمان</h3>
            <p className="text-gray-400 mb-6">
              منصة تجمع جميع الهاكاثونات في سلطنة عمان
            </p>
            <div className="flex justify-center space-x-4">
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
