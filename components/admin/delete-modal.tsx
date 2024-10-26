"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon, Loader2 } from "lucide-react";
import { deleteHackathon } from "@/lib/firebase/admin";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  hackathonId: string;
  hackathonTitle: string;
}

export function DeleteModal({ hackathonId, hackathonTitle }: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteHackathon(hackathonId);
      toast.success("تم حذف الهاكاثون بنجاح");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting hackathon:", error);
      toast.error("حدث خطأ في حذف الهاكاثون");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد حذف الهاكاثون</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد من حذف &quot;{hackathonTitle}&quot;؟
            <br />
            لا يمكن التراجع عن هذا الإجراء.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري الحذف...
              </div>
            ) : (
              "حذف"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
