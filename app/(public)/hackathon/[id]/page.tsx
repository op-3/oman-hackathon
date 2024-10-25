"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HackathonForm from "@/components/admin/hackathon-form";
import { getHackathonById, updateHackathon } from "@/lib/firebase/admin";
import toast from "react-hot-toast";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditHackathonPage({ params }: PageProps) {
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      loadHackathon();
    }
  }, [params.id]);

  const loadHackathon = async () => {
    try {
      setLoading(true);
      const data = await getHackathonById(params.id);

      if (!data) {
        toast.error("الهاكاثون غير موجود");
        router.push("/admin/dashboard");
        return;
      }

      // تنسيق التواريخ للنموذج
      setHackathon({
        ...data,
        startDate:
          data.startDate instanceof Date
            ? data.startDate.toISOString().split("T")[0]
            : new Date(data.startDate).toISOString().split("T")[0],
        endDate:
          data.endDate instanceof Date
            ? data.endDate.toISOString().split("T")[0]
            : new Date(data.endDate).toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error loading hackathon:", error);
      toast.error("حدث خطأ في تحميل البيانات");
      router.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      await updateHackathon(params.id, {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        updatedAt: new Date(),
      });

      toast.success("تم تحديث الهاكاثون بنجاح");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating hackathon:", error);
      toast.error("حدث خطأ في تحديث الهاكاثون");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            لم يتم العثور على الهاكاثون
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">تعديل الهاكاثون</h1>
        <HackathonForm
          initialData={hackathon}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
