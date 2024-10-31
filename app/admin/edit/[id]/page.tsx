import { getHackathonById } from "@/lib/firebase/admin";
import { EditHackathonForm } from "./edit-form";
import { notFound } from "next/navigation";

// تعريف نوع المعاملات بشكل عام
type PageContext = {
  params: Record<string, string>;
  searchParams: Record<string, string | string[]>;
};

// الدالة الرئيسية للصفحة
export default async function Page(context: PageContext) {
  // التحقق من وجود معرف
  if (!context.params?.id) {
    return notFound();
  }

  try {
    const hackathon = await getHackathonById(context.params.id);

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

// إضافة تعريف generateMetadata (اختياري)
export async function generateMetadata({ params }: PageContext) {
  return {
    title: `تعديل الهاكاثون ${params.id}`,
  };
}
