"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HackathonForm from "@/components/admin/hackathon-form";
import { getHackathonById, updateHackathon } from "@/lib/firebase/admin";
import { cn } from "@/lib/utils";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditHackathonPage({ params }: PageProps) {
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        toast({
          variant: "destructive",
          title: "خطأ",
          description: "الهاكاثون غير موجود",
        });
        router.push("/admin/dashboard");
        return;
      }

      setHackathon({
        ...data,
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate),
      });
    } catch (error) {
      console.error("Error loading hackathon:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ في تحميل البيانات",
      });
      router.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async (data: any) => {
    try {
      setSaving(true);
      await updateHackathon(params.id, {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        updatedAt: new Date(),
      });

      toast({
        title: "تم التحديث",
        description: "تم تحديث الهاكاثون بنجاح",
      });
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating hackathon:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ في تحديث الهاكاثون",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push("/admin/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-background to-secondary/10 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={handleBack}
          disabled={loading || saving}
        >
          <ArrowLeft className="ml-2 h-4 w-4" />
          العودة للوحة التحكم
        </Button>

        <Card className="backdrop-blur-sm bg-background/95">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              تعديل الهاكاثون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">
                    جاري تحميل البيانات...
                  </p>
                </motion.div>
              ) : !hackathon ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert variant="destructive">
                    <AlertDescription>
                      لم يتم العثور على الهاكاثون المطلوب
                    </AlertDescription>
                  </Alert>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HackathonForm
                    initialData={hackathon}
                    onSubmit={handleSubmit}
                    isLoading={saving}
                  />
                  <div className="mt-6 flex justify-end">
                    <Button
                      type="submit"
                      form="hackathon-form"
                      disabled={saving}
                      className={cn("min-w-[140px]", saving && "animate-pulse")}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="ml-2 h-4 w-4" />
                          حفظ التغييرات
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
