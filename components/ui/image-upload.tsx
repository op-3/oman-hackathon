"use client";

import { useCallback, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { uploadImageToStorage } from "@/lib/firebase/storage";
import { auth } from "@/lib/firebase/config"; // إضافة هذا الاستيراد
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  disabled,
  className,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const file = e.dataTransfer.files?.[0];
      await handleFileUpload(file);
    },
    [disabled]
  );

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      await handleFileUpload(file);
    },
    []
  );

  const handleFileUpload = async (file?: File) => {
    if (!file) return;

    try {
      setLoading(true);

      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("يجب أن يكون الملف صورة");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        toast.error("يجب تسجيل الدخول أولاً");
        return;
      }

      const imageUrl = await uploadImageToStorage(file);
      onChange(imageUrl);
      toast.success("تم رفع الصورة بنجاح");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onChange("");
    },
    [onChange]
  );

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg transition-all",
          dragActive && "border-primary bg-primary/10",
          disabled && "opacity-50 cursor-not-allowed",
          !value && "hover:border-primary hover:bg-primary/5"
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={disabled || loading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {value ? (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            ) : (
              <>
                <ImageIcon className="h-8 w-8" />
                <div className="text-center">
                  <p className="font-medium">
                    اسحب وأفلت الصورة هنا أو اضغط للاختيار
                  </p>
                  <p className="text-xs">PNG, JPG (الحد الأقصى 5MB)</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
