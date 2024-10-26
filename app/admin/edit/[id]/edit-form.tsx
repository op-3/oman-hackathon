"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateHackathon } from "@/lib/firebase/admin";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2 } from "lucide-react";

interface EditHackathonFormProps {
  initialData: any;
}

export function EditHackathonForm({ initialData }: EditHackathonFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData.title,
    description: initialData.description,
    startDate: new Date(initialData.startDate).toISOString().split("T")[0],
    endDate: new Date(initialData.endDate).toISOString().split("T")[0],
    location: initialData.location,
    organizer: initialData.organizer,
    registrationLink: initialData.registrationLink,
    status: initialData.status,
    imageUrl: initialData.imageUrl,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.imageUrl) {
        toast.error("يجب إضافة صورة للهاكاثون");
        return;
      }

      await updateHackathon(initialData.id, {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        updatedAt: new Date(),
      });

      toast.success("تم تحديث الهاكاثون بنجاح");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error updating hackathon:", error);
      toast.error("حدث خطأ في تحديث الهاكاثون");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* صورة الهاكاثون */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              صورة الهاكاثون
              <span className="text-red-500 mr-1">*</span>
            </label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              disabled={loading}
            />
          </div>

          {/* عنوان الهاكاثون */}
          <Input
            label="عنوان الهاكاثون"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            disabled={loading}
          />

          {/* وصف الهاكاثون */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              وصف الهاكاثون
              <span className="text-red-500 mr-1">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full min-h-[150px] rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          {/* التواريخ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="تاريخ البداية"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
              disabled={loading}
            />
            <Input
              type="date"
              label="تاريخ النهاية"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          {/* الموقع والمنظم */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="الموقع"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              disabled={loading}
            />
            <Input
              label="المنظم"
              value={formData.organizer}
              onChange={(e) =>
                setFormData({ ...formData, organizer: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          {/* رابط التسجيل */}
          <Input
            label="رابط التسجيل"
            type="url"
            value={formData.registrationLink}
            onChange={(e) =>
              setFormData({ ...formData, registrationLink: e.target.value })
            }
            required
            disabled={loading}
          />

          {/* الحالة */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              حالة الهاكاثون
              <span className="text-red-500 mr-1">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            >
              <option value="upcoming">قادم</option>
              <option value="ongoing">جاري</option>
              <option value="completed">منتهي</option>
            </select>
          </div>

          {/* أزرار التحكم */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : (
                "تحديث"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/admin/dashboard")}
              disabled={loading}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
