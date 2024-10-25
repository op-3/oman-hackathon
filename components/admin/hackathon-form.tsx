"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageUpload } from "../ui/image-upload";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface HackathonFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

const HackathonForm = ({
  initialData,
  onSubmit,
  isLoading,
}: HackathonFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate
      ? new Date(initialData.startDate).toISOString().split("T")[0]
      : "",
    endDate: initialData?.endDate
      ? new Date(initialData.endDate).toISOString().split("T")[0]
      : "",
    location: initialData?.location || "",
    organizer: initialData?.organizer || "",
    registrationLink: initialData?.registrationLink || "",
    status: initialData?.status || "upcoming",
    imageUrl: initialData?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      toast.error("يجب إضافة صورة للهاكاثون");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("حدث خطأ أثناء حفظ البيانات");
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
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
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">
              يفضل أن تكون الصورة بأبعاد 1920×1080 بكسل
            </p>
          </div>

          {/* عنوان الهاكاثون */}
          <div className="space-y-2">
            <Input
              label="عنوان الهاكاثون"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              disabled={isLoading}
              placeholder="أدخل عنوان الهاكاثون"
            />
          </div>

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
              disabled={isLoading}
              placeholder="اكتب وصفاً تفصيلياً للهاكاثون"
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
              disabled={isLoading}
            />
            <Input
              type="date"
              label="تاريخ النهاية"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              required
              disabled={isLoading}
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
              disabled={isLoading}
              placeholder="مكان إقامة الهاكاثون"
            />
            <Input
              label="المنظم"
              value={formData.organizer}
              onChange={(e) =>
                setFormData({ ...formData, organizer: e.target.value })
              }
              required
              disabled={isLoading}
              placeholder="الجهة المنظمة"
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
            disabled={isLoading}
            placeholder="https://example.com/register"
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
              disabled={isLoading}
            >
              <option value="upcoming">قادم</option>
              <option value="ongoing">جاري</option>
              <option value="completed">منتهي</option>
            </select>
          </div>

          {/* أزرار التحكم */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : initialData ? (
                "تحديث"
              ) : (
                "إضافة"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default HackathonForm;
