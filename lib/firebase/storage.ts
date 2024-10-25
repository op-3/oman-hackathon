import { storage } from "./config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth } from "./config";

export async function uploadImageToStorage(file: File): Promise<string> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("يجب تسجيل الدخول أولاً");
    }

    const filename = `hackathons/${Date.now()}_${file.name.replace(
      /[^a-zA-Z0-9.]/g,
      "_"
    )}`;
    const storageRef = ref(storage, filename);

    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedBy: user.uid,
        uploadedAt: new Date().toISOString(),
      },
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("فشل في رفع الصورة");
  }
}

export async function deleteImageFromStorage(imageUrl: string) {
  try {
    // استخراج مسار الملف من URL
    const decodedUrl = decodeURIComponent(imageUrl);
    const startIndex = decodedUrl.indexOf("/o/") + 3;
    const endIndex = decodedUrl.indexOf("?");
    const filePath = decodedUrl.substring(startIndex, endIndex);

    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    // لا نريد رمي الخطأ هنا لأنه قد يكون الملف محذوفاً بالفعل
    // throw new Error('فشل في حذف الصورة')
  }
}
