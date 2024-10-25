import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// دمج الأصناف مع Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// تحويل التاريخ إلى صيغة قابلة للقراءة
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ar-OM", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// حساب حالة الهاكاثون
export function calculateHackathonStatus(
  startDate: Date,
  endDate: Date
): "upcoming" | "ongoing" | "completed" {
  const now = new Date();

  if (now < startDate) {
    return "upcoming";
  } else if (now >= startDate && now <= endDate) {
    return "ongoing";
  } else {
    return "completed";
  }
}

// تنسيق حجم الملف
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// التحقق من صحة امتداد الملف
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

// تحويل خطأ Firebase إلى رسالة مفهومة
export function getFirebaseErrorMessage(error: { code: string }): string {
  const errorMessages: Record<string, string> = {
    "auth/wrong-password": "كلمة المرور غير صحيحة",
    "auth/user-not-found": "البريد الإلكتروني غير مسجل",
    "auth/email-already-in-use": "البريد الإلكتروني مستخدم مسبقاً",
    "auth/weak-password": "كلمة المرور ضعيفة",
    "auth/invalid-email": "البريد الإلكتروني غير صالح",
    "storage/unauthorized": "غير مصرح برفع الملف",
    "storage/canceled": "تم إلغاء رفع الملف",
    "storage/unknown": "حدث خطأ غير معروف",
  };

  return errorMessages[error.code] || "حدث خطأ غير متوقع";
}
