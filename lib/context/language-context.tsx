"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
  language: "ar" | "en";
  setLanguage: (lang: "ar" | "en") => void;
  dir: "rtl" | "ltr";
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<"ar" | "en">("ar");

  useEffect(() => {
    // Get saved language from localStorage if exists
    const savedLanguage = localStorage.getItem("language") as "ar" | "en";
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: "ar" | "en") => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const value = {
    language,
    setLanguage,
    dir: language === "ar" ? "rtl" : "ltr",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
