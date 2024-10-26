// components/features/featured-hackathon-card.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HackathonDetailsDialog } from "../public/hackathon-details-dialog";

interface FeaturedHackathonCardProps {
  hackathon: any;
}

export function FeaturedHackathonCard({
  hackathon,
}: FeaturedHackathonCardProps) {
  const formatDate = (date: any) => {
    try {
      return new Date(date).toLocaleDateString("ar-OM", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "تاريخ غير محدد";
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          text: "قادم",
          className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        };
      case "ongoing":
        return {
          text: "جاري",
          className: "bg-green-500/20 text-green-400 border-green-500/30",
        };
      case "completed":
        return {
          text: "منتهي",
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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black to-gray-900 border border-white/10">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-2/5 aspect-[16/9] md:aspect-auto">
          <Image
            src={hackathon.imageUrl || "/placeholder.jpg"}
            alt={hackathon.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative flex-1 p-6 md:p-8">
          {/* Status Badge */}
          <Badge className={status.className}>{status.text}</Badge>

          {/* Title */}
          <h3 className="text-2xl font-bold mt-4 mb-3 text-white">
            {hackathon.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-6 line-clamp-2">
            {hackathon.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(hackathon.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>{hackathon.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-5 h-5" />
              <span>{hackathon.organizer}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <HackathonDetailsDialog
              hackathon={hackathon}
              trigger={
                <Button variant="outline" className="group">
                  <span>عرض التفاصيل</span>
                  <ArrowRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                </Button>
              }
            />
            {hackathon.status !== "completed" && (
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a
                  href={hackathon.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  سجل الآن
                </a>
              </Button>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
