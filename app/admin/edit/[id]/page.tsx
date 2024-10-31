// app/admin/edit/[id]/page.tsx
import { getHackathonById } from "@/lib/firebase/admin";
import { EditHackathonForm } from "./edit-form";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

interface EditParams {
  id: string;
}

export default async function EditPage({ params }: { params: EditParams }) {
  try {
    const hackathon = await getHackathonById(params.id);

    if (!hackathon) {
      return notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">تعديل الهاكاثون</h1>
          <EditHackathonForm initialData={hackathon} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading hackathon:", error);
    return notFound();
  }
}

// إضافة تعريف صريح لمتغيرات البيئة المطلوبة
export const dynamic = "force-dynamic";
export const revalidate = 0;
