import Image from "next/image";
import { Calendar, MapPin, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { HackathonDetailsDialog } from "./hackathon-details-dialog";

interface HackathonCardProps {
  hackathon: any;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return { text: "قادم", variant: "info" as const };
      case "ongoing":
        return { text: "جاري", variant: "success" as const };
      case "completed":
        return { text: "منتهي", variant: "secondary" as const };
      default:
        return { text: status, variant: "default" as const };
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("ar-OM", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const status = getStatusBadge(hackathon.status);

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* صورة الهاكاثون */}
      <div className="relative aspect-video">
        <Image
          src={hackathon.imageUrl || "/placeholder.png"}
          alt={hackathon.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant={status.variant}>{status.text}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
            {hackathon.title}
          </h3>
          <p className="text-white/90 text-sm line-clamp-2">
            {hackathon.description}
          </p>
        </div>
      </div>

      {/* معلومات الهاكاثون */}
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{hackathon.organizer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{hackathon.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(hackathon.startDate)}</span>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="grid grid-cols-2 gap-2">
          <HackathonDetailsDialog
            hackathon={hackathon}
            trigger={
              <Button variant="outline" className="w-full">
                التفاصيل
              </Button>
            }
          />
          <Button className="w-full" asChild>
            <a
              href={hackathon.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              التسجيل
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
