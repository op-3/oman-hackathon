"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHackathonById, updateHackathon } from "@/lib/firebase/utils";
import toast from "react-hot-toast";
import HackathonForm from "@/components/admin/hackathon-form";
import { Hackathon } from "@/lib/types";

export default function EditHackathonPage({
  params,
}: {
  params: { id: string };
}) {
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadHackathon();
  }, []);

  const loadHackathon = async () => {
    try {
      const data = await getHackathonById(params.id);
      setHackathon(data);
    } catch (error) {
      toast.error("حدث خطأ في تحميل البيانات");
      router.push("/admin/dashboard");
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      await updateHackathon(params.id, data);
      toast.success("تم تحديث الهاكاثون بنجاح");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("حدث خطأ في تحديث الهاكاثون");
    }
  };

  if (!hackathon) {
    return <div className="text-center py-12">جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">تعديل الهاكاثون</h1>
      <HackathonForm onSubmit={handleSubmit} initialData={hackathon} />
    </div>
  );
}
