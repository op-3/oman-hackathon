"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllHackathons } from "@/lib/firebase/admin";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/admin/delete-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export default function DashboardPage() {
  const [hackathons, setHackathons] = useState<any[]>([]);
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
      console.error("Error loading hackathons:", error);
      toast.error("حدث خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: Timestamp | Date | null) => {
    try {
      if (!timestamp) return "تاريخ غير محدد";

      const date =
        timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
      return date.toLocaleDateString("ar-OM", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "تاريخ غير محدد";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow">
          {/* رأس الصفحة */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
              <Button
                onClick={() => router.push("/admin/add")}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-5 w-5" />
                إضافة هاكاثون جديد
              </Button>
            </div>
          </div>

          {/* جدول الهاكاثونات */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    العنوان
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    المنظم
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    التاريخ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    الحالة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hackathons.map((hackathon) => (
                  <tr key={hackathon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {hackathon.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {hackathon.organizer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(hackathon.startDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          hackathon.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : hackathon.status === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {hackathon.status === "upcoming" && "قادم"}
                        {hackathon.status === "ongoing" && "جاري"}
                        {hackathon.status === "completed" && "منتهي"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/edit/${hackathon.id}`}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          prefetch={true} // إضافة prefetch للتحميل المسبق
                        >
                          تعديل
                        </Link>
                        <DeleteModal
                          hackathonId={hackathon.id}
                          hackathonTitle={hackathon.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* حالة عدم وجود بيانات */}
            {hackathons.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  لا توجد هاكاثونات حالياً
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
