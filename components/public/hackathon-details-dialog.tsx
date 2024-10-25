"use client";

import Image from "next/image";
import { Calendar, MapPin, User, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";

interface HackathonDetailsDialogProps {
  hackathon: any;
  trigger?: React.ReactNode;
}

export function HackathonDetailsDialog({
  hackathon,
  trigger,
}: HackathonDetailsDialogProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "ongoing":
        return "success";
      case "completed":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "قادم";
      case "ongoing":
        return "جاري";
      case "completed":
        return "منتهي";
      default:
        return status;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">التفاصيل</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>{hackathon.title}</span>
            <Badge variant={getStatusBadgeVariant(hackathon.status)}>
              {getStatusText(hackathon.status)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* صورة الهاكاثون */}
          {hackathon.imageUrl && (
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src={hackathon.imageUrl}
                alt={hackathon.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* معلومات الهاكاثون */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">عن الهاكاثون</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {hackathon.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span>{hackathon.organizer}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{hackathon.location}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {formatDate(hackathon.startDate)} -{" "}
                    {formatDate(hackathon.endDate)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <LinkIcon className="h-5 w-5" />
                  <a
                    href={hackathon.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    رابط التسجيل
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg space-y-6">
              <h3 className="text-lg font-semibold">التسجيل في الهاكاثون</h3>
              <p className="text-sm text-muted-foreground">
                سجل الآن للمشاركة في هذا الهاكاثون المميز وكن جزءاً من التجربة
              </p>
              <a
                href={hackathon.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full">سجل الآن</Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
