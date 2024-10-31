import { getHackathonById } from "@/lib/firebase/admin";
import { EditHackathonForm } from "./edit-form";
import { notFound } from "next/navigation";

// نوع مخصص للمعاملات
interface RouteParams {
  id: string;
}

// نوع مخصص للمكون
interface EditPageProps {
  params: RouteParams;
}

// تغيير تعريف المكون لاستخدام النوع الجديد
const EditPage = async ({ params }: EditPageProps) => {
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
};

// حل مشكلة TypeScript عن طريق تعريف نوع المكون
EditPage.displayName = "EditHackathonPage";

export default EditPage;
