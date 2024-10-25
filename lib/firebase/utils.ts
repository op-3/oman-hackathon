import { db, storage } from "./config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Hackathon } from "../types";

// وظيفة إضافة هاكاثون جديد
export async function addHackathon(data: Omit<Hackathon, "id">) {
  const docRef = await addDoc(collection(db, "hackathons"), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
}

// وظيفة تحديث هاكاثون
export async function updateHackathon(id: string, data: Partial<Hackathon>) {
  const docRef = doc(db, "hackathons", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date(),
  });
}

// وظيفة حذف هاكاثون
export async function deleteHackathon(id: string) {
  const docRef = doc(db, "hackathons", id);
  await deleteDoc(docRef);
}

// وظيفة جلب جميع الهاكاثونات
export async function getAllHackathons() {
  const querySnapshot = await getDocs(collection(db, "hackathons"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Hackathon[];
}
