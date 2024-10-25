"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllHackathons, deleteHackathon } from "@/lib/firebase/admin";
import { Hackathon } from "@/lib/types";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadHackathons();
  }, []);

  const loadHackathons = async () => {
    try {
      setLoading(true);
      const data = await getAllHackathons();
      setHackathons(data);
    } catch (error) {
      toast.error("حدث خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الهاكاثون؟")) {
      try {
        await deleteHackathon(id);
        toast.success("تم حذف الهاكاثون بنجاح");
        await loadHackathons();
      } catch (error) {
        toast.error("حدث خطأ في حذف الهاكاثون");
      }
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "--";
    if (date instanceof Date) {
      return date.toLocaleDateString("ar-OM");
    }
    // إذا كان التاريخ من Firestore Timestamp
    if (date.toDate) {
      return date.toDate().toLocaleDateString("ar-OM");
    }
    // إذا كان string
    return new Date(date).toLocaleDateString("ar-OM");
  };

  if (loading) {
    return <div className="text-center py-12">جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <Link
          href="/admin/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          إضافة هاكاثون جديد
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right">العنوان</th>
              <th className="px-6 py-3 text-right">المنظم</th>
              <th className="px-6 py-3 text-right">التاريخ</th>
              <th className="px-6 py-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hackathons.map((hackathon) => (
              <tr key={hackathon.id}>
                <td className="px-6 py-4">{hackathon.title}</td>
                <td className="px-6 py-4">{hackathon.organizer}</td>
                <td className="px-6 py-4">{formatDate(hackathon.startDate)}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/admin/hackathons/${hackathon.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    تعديل
                  </Link>
                  <button
                    onClick={() => handleDelete(hackathon.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
