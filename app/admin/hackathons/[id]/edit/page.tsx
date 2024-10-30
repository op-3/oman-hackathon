// app/(public)/hackathon/[id]/page.tsx
import { getHackathonById } from "@/lib/firebase/admin";
import EditHackathonForm from "./edit-form";
import { notFound } from "next/navigation";

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
}

export default async function EditHackathonPage({ params }: PageProps) {
  try {
    const hackathon = await getHackathonById(params.id);
    if (!hackathon) return notFound();

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">تعديل الهاكاثون</h1>
          <EditHackathonForm hackathon={hackathon} />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
