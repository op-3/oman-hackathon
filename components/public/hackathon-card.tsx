"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HackathonDetailsDialog } from "./hackathon-details-dialog";
import { Timestamp } from "firebase/firestore";
import { useLanguage } from "@/lib/context/language-context";

const translations = {
  ar: {
    unknownDate: "تاريخ غير محدد",
    status: {
      upcoming: "قادم",
      ongoing: "جاري",
      completed: "منتهي",
    },
    details: "التفاصيل",
    register: "التسجيل",
  },
  en: {
    unknownDate: "Unknown Date",
    status: {
      upcoming: "Upcoming",
      ongoing: "Ongoing",
      completed: "Completed",
    },
    details: "Details",
    register: "Register",
  },
};

interface HackathonCardProps {
  hackathon: {
    id: string;
    title: string;
    description: string;
    startDate: Timestamp | Date;
    endDate: Timestamp | Date;
    location: string;
    organizer: string;
    registrationLink: string;
    imageUrl: string;
    status: "upcoming" | "ongoing" | "completed";
  };
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const formatDate = (timestamp: Timestamp | Date) => {
    try {
      const date =
        timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
      return date.toLocaleDateString(language === "ar" ? "ar-OM" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return t.unknownDate;
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          text: t.status.upcoming,
          variant: "info" as const,
          className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        };
      case "ongoing":
        return {
          text: t.status.ongoing,
          variant: "success" as const,
          className: "bg-green-500/10 text-green-500 border-green-500/20",
        };
      case "completed":
        return {
          text: t.status.completed,
          variant: "secondary" as const,
          className: "bg-gray-500/10 text-gray-300 border-gray-500/20",
        };
      default:
        return {
          text: status,
          variant: "default" as const,
          className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        };
    }
  };

  const status = getStatusConfig(hackathon.status);
  const isCompleted = hackathon.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all ${
        isCompleted ? "grayscale" : ""
      }`}
    >
      {/* Hackathon Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={hackathon.imageUrl || "/placeholder.jpg"}
          alt={hackathon.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isCompleted
              ? "from-black/90 via-black/60 to-black/30"
              : "from-black/80 via-black/30 to-transparent"
          }`}
        />

        {/* Status Badge */}
        <Badge
          variant={status.variant}
          className={`absolute top-4 ${
            language === "ar" ? "right-4" : "left-4"
          } ${status.className}`}
        >
          {status.text}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">
          {hackathon.title}
        </h3>

        <p
          className={`mb-4 line-clamp-2 ${
            isCompleted ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {hackathon.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar
              className={`w-4 h-4 ${
                language === "ar" ? "ml-2" : "mr-2"
              } shrink-0`}
            />
            <span className="truncate">{formatDate(hackathon.startDate)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <MapPin
              className={`w-4 h-4 ${
                language === "ar" ? "ml-2" : "mr-2"
              } shrink-0`}
            />
            <span className="truncate">{hackathon.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <User
              className={`w-4 h-4 ${
                language === "ar" ? "ml-2" : "mr-2"
              } shrink-0`}
            />
            <span className="truncate">{hackathon.organizer}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HackathonDetailsDialog
            hackathon={hackathon}
            trigger={
              <Button
                variant="outline"
                className={`w-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 ${
                  isCompleted ? "text-gray-400" : "text-white"
                }`}
              >
                {t.details}
              </Button>
            }
          />

          {!isCompleted && (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              asChild
            >
              <a
                href={hackathon.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{t.register}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
