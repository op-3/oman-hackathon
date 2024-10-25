import { getHackathonById } from "@/lib/firebase/admin";
import EditHackathonForm from "./edit-form";
import { notFound } from "next/navigation";

export default async function EditHackathonPage({
  params,
}: {
  params: { id: string };
}) {
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
    return notFound();
  }
}
