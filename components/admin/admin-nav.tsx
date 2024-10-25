"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function AdminNav() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/admin/dashboard"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              لوحة التحكم
            </Link>
            <Link
              href="/admin/add"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/admin/add"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              إضافة هاكاثون
            </Link>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </nav>
  );
}
