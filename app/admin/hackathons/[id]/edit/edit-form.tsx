"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateHackathon } from "@/lib/firebase/admin";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface EditHackathonFormProps {
  initialData: any;
}

export default function EditHackathonForm({
  initialData,
}: EditHackathonFormProps) {
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
          <Input
            label="عنوان الهاكاثون"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />

            <Input
              label="تاريخ النهاية"
              type="date"
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

          <div>
            <label className="block text-sm font-medium mb-2">الحالة</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full rounded-md border border-input p-2"
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
              {loading ? "جاري الحفظ..." : "تحديث"}
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
