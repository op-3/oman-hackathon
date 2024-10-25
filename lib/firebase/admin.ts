import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "./config";
import { type Hackathon } from "../types";

export async function addHackathon(data: any) {
  try {
    // التحقق من البيانات المطلوبة
    if (!data.title || !data.description || !data.startDate || !data.endDate) {
      throw new Error("جميع الحقول المطلوبة يجب أن تكون موجودة");
    }

    // تنسيق البيانات
    const hackathonData = {
      title: data.title,
      description: data.description,
      startDate:
        typeof data.startDate === "string"
          ? new Date(data.startDate)
          : data.startDate,
      endDate:
        typeof data.endDate === "string"
          ? new Date(data.endDate)
          : data.endDate,
      location: data.location || "",
      organizer: data.organizer || "",
      registrationLink: data.registrationLink || "",
      status: data.status || "upcoming",
      imageUrl: data.imageUrl || "",
      tags: data.tags || [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // إضافة الوثيقة إلى Firestore
    const hackathonsRef = collection(db, "hackathons");
    const docRef = await addDoc(hackathonsRef, hackathonData);

    return {
      id: docRef.id,
      ...hackathonData,
    };
  } catch (error) {
    console.error("Error adding hackathon:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("فشل في إضافة الهاكاثون");
  }
}

export async function updateHackathon(id: string, data: Partial<Hackathon>) {
  try {
    const docRef = doc(db, "hackathons", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating hackathon:", error);
    throw new Error("فشل في تحديث الهاكاثون");
  }
}

export async function deleteHackathon(id: string) {
  try {
    const docRef = doc(db, "hackathons", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting hackathon:", error);
    throw new Error("فشل في حذف الهاكاثون");
  }
}

export async function getHackathonById(id: string) {
  try {
    if (!id) throw new Error("ID is required");

    const docRef = doc(db, "hackathons", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();

    return {
      id: docSnap.id,
      title: data.title || "",
      description: data.description || "",
      organizer: data.organizer || "",
      location: data.location || "",
      startDate: data.startDate ? data.startDate.toDate() : null,
      endDate: data.endDate ? data.endDate.toDate() : null,
      registrationLink: data.registrationLink || "",
      imageUrl: data.imageUrl || "",
      status: data.status || "upcoming",
      tags: data.tags || [],
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
    };
  } catch (error) {
    console.error("Error getting hackathon:", error);
    throw error;
  }
}

export async function getAllHackathons(filters?: {
  status?: string;
  search?: string;
}) {
  try {
    const constraints = [orderBy("createdAt", "desc")];

    if (filters?.status && filters.status !== "all") {
      constraints.push(where("status", "==", filters.status));
    }

    const q = query(collection(db, "hackathons"), ...constraints);
    const querySnapshot = await getDocs(q);

    let hackathons = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Hackathon[];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      hackathons = hackathons.filter(
        (hackathon) =>
          hackathon.title.toLowerCase().includes(searchLower) ||
          hackathon.description.toLowerCase().includes(searchLower) ||
          hackathon.organizer.toLowerCase().includes(searchLower)
      );
    }

    return hackathons;
  } catch (error) {
    console.error("Error getting hackathons:", error);
    throw new Error("فشل في جلب الهاكاثونات");
  }
}
