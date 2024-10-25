"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import toast from "react-hot-toast";

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
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    location: initialData?.location || "",
    organizer: initialData?.organizer || "",
    registrationLink: initialData?.registrationLink || "",
    status: initialData?.status || "upcoming",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("حدث خطأ أثناء حفظ البيانات");
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="عنوان الهاكاثون"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            disabled={isLoading}
          />

          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-md border border-input p-2 min-h-[100px]"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="تاريخ البداية"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
              disabled={isLoading}
            />

            <Input
              label="تاريخ النهاية"
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>

          <Input
            label="الموقع"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            disabled={isLoading}
          />

          <Input
            label="المنظم"
            value={formData.organizer}
            onChange={(e) =>
              setFormData({ ...formData, organizer: e.target.value })
            }
            required
            disabled={isLoading}
          />

          <Input
            label="رابط التسجيل"
            type="url"
            value={formData.registrationLink}
            onChange={(e) =>
              setFormData({ ...formData, registrationLink: e.target.value })
            }
            required
            disabled={isLoading}
          />

          <div>
            <label className="block text-sm font-medium mb-2">الحالة</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full rounded-md border border-input p-2"
              required
              disabled={isLoading}
            >
              <option value="upcoming">قادم</option>
              <option value="ongoing">جاري</option>
              <option value="completed">منتهي</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : initialData ? "تحديث" : "إضافة"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HackathonForm;
