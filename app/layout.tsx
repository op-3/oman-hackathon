import { AuthProvider } from "../lib/context/auth-context";
import { LanguageProvider } from "../lib/context/language-context";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
});

export const metadata = {
  title: "Oman Hackathon",
  description: "منصة لعرض الهاكاثونات المتاحة في سلطنة عمان",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <html>
        <body className={cairo.className}>
          <AuthProvider>
            <Toaster position="top-center" />
            {children}
          </AuthProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
