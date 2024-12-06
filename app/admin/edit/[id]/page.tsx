import { getHackathonById } from "@/lib/firebase/admin";
import { EditHackathonForm } from "./edit-form";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditHackathonPage({ params }: PageProps) {
  console.log("Current ID:", params.id); // للتأكد من وصول المعرف

  if (!params.id) {
    console.log("No ID provided");
    return notFound();
  }

  try {
    const hackathon = await getHackathonById(params.id);
    console.log("Fetched Hackathon:", hackathon); // للتأكد من البيانات المسترجعة

    if (!hackathon) {
      console.log("No hackathon found with ID:", params.id);
      return notFound();
    }

    const formattedHackathon = {
      ...hackathon,
      startDate: hackathon.startDate
        ? new Date(hackathon.startDate).toISOString().split("T")[0]
        : "",
      endDate: hackathon.endDate
        ? new Date(hackathon.endDate).toISOString().split("T")[0]
        : "",
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">تعديل الهاكاثون</h1>
          <EditHackathonForm initialData={formattedHackathon} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in edit page:", error);
    throw error; // سيتم التقاطه بواسطة صفحة الخطأ الافتراضية في Next.js
  }
}
