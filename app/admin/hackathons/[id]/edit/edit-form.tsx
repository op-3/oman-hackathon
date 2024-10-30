"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHackathonById, updateHackathon } from "@/lib/firebase/admin";
import {
  uploadImageToStorage,
  deleteImageFromStorage,
} from "@/lib/firebase/storage";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2 } from "lucide-react";

interface EditHackathonFormProps {
  id: string;
}

export default function EditHackathonForm({ id }: EditHackathonFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<HackathonData | null>(null);

  useEffect(() => {
    const loadHackathon = async () => {
      try {
        const data = await getHackathonById(id);
        if (!data) {
          router.push("/404");
          return;
        }

        setFormData({
          ...data,
          startDate: new Date(data.startDate).toISOString().split("T")[0],
          endDate: new Date(data.endDate).toISOString().split("T")[0],
        });
      } catch (error) {
        toast.error("حدث خطأ في تحميل البيانات");
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    loadHackathon();
  }, [id, router]);

  if (loading || !formData) {
    return <div>Loading...</div>;
  }

  const handleImageChange = async (newImageUrl: string) => {
    try {
      if (!newImageUrl && formData.imageUrl) {
        await deleteImageFromStorage(formData.imageUrl);
      }

      setFormData((prev) => ({
        ...prev!,
        imageUrl: newImageUrl,
      }));
    } catch (error) {
      console.error("Error handling image change:", error);
      toast.error("حدث خطأ أثناء تحديث الصورة");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.imageUrl) {
        toast.error("يجب إضافة صورة للهاكاثون");
        return;
      }

      await updateHackathon(id, {
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              صورة الهاكاثون
              <span className="text-red-500 mr-1">*</span>
            </label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={handleImageChange}
              disabled={loading}
            />
            <p className="text-xs text-gray-500">
              يفضل أن تكون الصورة بأبعاد 1920×1080 بكسل
            </p>
          </div>

          <Input
            label="عنوان الهاكاثون"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            disabled={loading}
            placeholder="أدخل عنوان الهاكاثون"
          />

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
              placeholder="اكتب وصفاً تفصيلياً للهاكاثون"
            />
          </div>

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

          <Input
            label="الموقع"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            disabled={loading}
            placeholder="مكان إقامة الهاكاثون"
          />

          <Input
            label="المنظم"
            value={formData.organizer}
            onChange={(e) =>
              setFormData({ ...formData, organizer: e.target.value })
            }
            required
            disabled={loading}
            placeholder="الجهة المنظمة"
          />

          <Input
            label="رابط التسجيل"
            type="url"
            value={formData.registrationLink}
            onChange={(e) =>
              setFormData({ ...formData, registrationLink: e.target.value })
            }
            required
            disabled={loading}
            placeholder="https://example.com/register"
          />

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
