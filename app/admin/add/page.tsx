"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HackathonForm from "@/components/admin/hackathon-form";
import { addHackathon } from "@/lib/firebase/admin";
import toast from "react-hot-toast";
import { useAuth } from "../../../lib/context/auth-context";

export default function AddHackathonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (data: any) => {
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً");
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      // تحويل التواريخ إلى كائنات Date
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user.uid,
      };

      await addHackathon(formattedData);
      toast.success("تم إضافة الهاكاثون بنجاح");
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Error adding hackathon:", error);
      toast.error(error.message || "حدث خطأ في إضافة الهاكاثون");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // سيتم التوجيه تلقائياً بواسطة AuthProvider
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">إضافة هاكاثون جديد</h1>
      <div className="max-w-2xl mx-auto">
        <HackathonForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
