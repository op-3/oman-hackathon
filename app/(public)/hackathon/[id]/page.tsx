import type { PageProps } from "./types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathon Details",
};

export default function Page({ params }: PageProps) {
  return (
    <div>
      <h1>Hackathon {params.id}</h1>
    </div>
  );
}

// إضافة اسم العرض
Page.displayName = "HackathonPage";
