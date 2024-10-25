import { HackathonDetailsDialog } from "./hackathon-details-dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { CalendarIcon, MapPinIcon } from "lucide-react";

interface HackathonCardProps {
  hackathon: any;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {hackathon.imageUrl && (
        <div className="relative h-48">
          <Image
            src={hackathon.imageUrl}
            alt={hackathon.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold line-clamp-1">
          {hackathon.title}
        </h3>

        <p className="text-muted-foreground line-clamp-2">
          {hackathon.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(hackathon.startDate).toLocaleDateString("ar-OM")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4" />
            <span>{hackathon.location}</span>
          </div>
        </div>

        <div className="pt-4 flex gap-2">
          <HackathonDetailsDialog
            hackathon={hackathon}
            trigger={
              <Button variant="outline" className="flex-1">
                التفاصيل
              </Button>
            }
          />
          <Button className="flex-1" asChild>
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
