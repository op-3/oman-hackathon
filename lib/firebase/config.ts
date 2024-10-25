import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// تهيئة Firebase فقط إذا لم تكن مهيأة مسبقاً
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// تهيئة الخدمات
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// استخدام المحاكيات في بيئة التطوير
if (process.env.NODE_ENV === "development") {
  // يمكنك تعليق هذا الكود إذا كنت لا تستخدم المحاكيات
  // connectAuthEmulator(auth, 'http://localhost:9099')
  // connectFirestoreEmulator(db, 'localhost', 8080)
  // connectStorageEmulator(storage, 'localhost', 9199)
}

export { app, auth, db, storage };
