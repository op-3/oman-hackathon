"use client";

import { Calendar, MapPin, User, Clock, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import { useLanguage } from "@/lib/context/language-context";

const translations = {
  ar: {
    status: {
      upcoming: "قادم",
      ongoing: "جاري",
      completed: "منتهي",
    },
    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    location: "الموقع",
    organizer: "المنظم",
    duration: "المدة",
    days: "أيام",
    registrationLink: "رابط التسجيل",
    register: "سجل الآن",
    unknownDate: "تاريخ غير محدد",
    close: "إغلاق",
  },
  en: {
    status: {
      upcoming: "Upcoming",
      ongoing: "Ongoing",
      completed: "Completed",
    },
    startDate: "Start Date",
    endDate: "End Date",
    location: "Location",
    organizer: "Organizer",
    duration: "Duration",
    days: "days",
    registrationLink: "Registration Link",
    register: "Register Now",
    unknownDate: "Unknown Date",
    close: "Close",
  },
};

interface HackathonDetailsDialogProps {
  hackathon: {
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
  trigger: React.ReactNode;
}

export function HackathonDetailsDialog({
  hackathon,
  trigger,
}: HackathonDetailsDialogProps) {
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

  const calculateDuration = (
    startDate: Timestamp | Date,
    endDate: Timestamp | Date
  ) => {
    const start =
      startDate instanceof Timestamp ? startDate.toDate() : startDate;
    const end = endDate instanceof Timestamp ? endDate.toDate() : endDate;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${t.days}`;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          text: t.status.upcoming,
          className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        };
      case "ongoing":
        return {
          text: t.status.ongoing,
          className: "bg-green-500/20 text-green-400 border-green-500/30",
        };
      case "completed":
        return {
          text: t.status.completed,
          className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        };
      default:
        return {
          text: status,
          className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        };
    }
  };

  const status = getStatusConfig(hackathon.status);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black/90 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            <span>{hackathon.title}</span>
            <Badge className={status.className}>{status.text}</Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-6">
          <Image
            src={hackathon.imageUrl || "/placeholder.jpg"}
            alt={hackathon.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6">{hackathon.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t.startDate}</p>
              <p>{formatDate(hackathon.startDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t.endDate}</p>
              <p>{formatDate(hackathon.endDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t.location}</p>
              <p>{hackathon.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <User className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t.organizer}</p>
              <p>{hackathon.organizer}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t.duration}</p>
              <p>{calculateDuration(hackathon.startDate, hackathon.endDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <LinkIcon className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t.registrationLink}</p>
              <a
                href={hackathon.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 truncate block"
              >
                {hackathon.registrationLink}
              </a>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <DialogTrigger asChild>
            <Button variant="outline">{t.close}</Button>
          </DialogTrigger>
          {hackathon.status !== "completed" && (
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <a
                href={hackathon.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.register}
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
