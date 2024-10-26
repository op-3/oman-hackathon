"use client";

import Image from "next/image";
import { Calendar, MapPin, User, ExternalLink, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timestamp } from "firebase/firestore";

interface HackathonDetailsDialogProps {
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
  trigger?: React.ReactNode;
}

export function HackathonDetailsDialog({
  hackathon,
  trigger,
}: HackathonDetailsDialogProps) {
  const formatDate = (timestamp: Timestamp | Date) => {
    try {
      const date =
        timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
      return date.toLocaleDateString("ar-OM", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "تاريخ غير محدد";
    }
  };

  const calculateTimeRemaining = (timestamp: Timestamp | Date) => {
    try {
      const startDate =
        timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
      const now = new Date();
      const diff = startDate.getTime() - now.getTime();

      if (diff <= 0) return null;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      return { days, hours };
    } catch (error) {
      console.error("Error calculating time remaining:", error);
      return null;
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          text: "قادم",
          variant: "info" as const,
          className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        };
      case "ongoing":
        return {
          text: "جاري",
          variant: "success" as const,
          className: "bg-green-500/10 text-green-500 border-green-500/20",
        };
      case "completed":
        return {
          text: "منتهي",
          variant: "secondary" as const,
          className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        };
      default:
        return {
          text: status,
          variant: "default" as const,
          className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        };
    }
  };

  const timeRemaining = calculateTimeRemaining(hackathon.startDate);
  const status = getStatusConfig(hackathon.status);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">التفاصيل</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-gray-900/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center justify-between">
            <span>{hackathon.title}</span>
            <Badge variant={status.variant} className={status.className}>
              {status.text}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* صورة الهاكاثون */}
          {hackathon.imageUrl && (
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src={hackathon.imageUrl}
                alt={hackathon.title}
                fill
                className="object-cover"
                priority
              />
              {timeRemaining && hackathon.status === "upcoming" && (
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-sm text-gray-400 mb-1">يبدأ في</div>
                  <div className="flex items-end gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {timeRemaining.days}
                      </div>
                      <div className="text-xs text-gray-400">يوم</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {timeRemaining.hours}
                      </div>
                      <div className="text-xs text-gray-400">ساعة</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* معلومات الهاكاثون */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  عن الهاكاثون
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {hackathon.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <User className="h-5 w-5" />
                  <span>{hackathon.organizer}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="h-5 w-5" />
                  <span>{hackathon.location}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <div>{formatDate(hackathon.startDate)}</div>
                    <div className="text-sm text-gray-500">
                      إلى {formatDate(hackathon.endDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 space-y-6 border border-white/10">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  التسجيل في الهاكاثون
                </h3>
                <p className="text-sm text-gray-400">
                  {hackathon.status === "completed"
                    ? "انتهى التسجيل في هذا الهاكاثون"
                    : "سجل الآن للمشاركة في هذا الهاكاثون المميز"}
                </p>
              </div>

              {hackathon.status !== "completed" && (
                <Button className="w-full" size="lg" asChild>
                  <a
                    href={hackathon.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>التسجيل الآن</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {hackathon.status === "upcoming" && "سيبدأ قريباً"}
                    {hackathon.status === "ongoing" && "جارٍ حالياً"}
                    {hackathon.status === "completed" && "انتهى"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
