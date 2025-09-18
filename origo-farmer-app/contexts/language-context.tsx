"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "odia" | "english"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  getText: (odia: string, english: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("odia")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("origo-language") as Language
    if (savedLanguage && (savedLanguage === "odia" || savedLanguage === "english")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("origo-language", newLanguage)
  }

  const getText = (odia: string, english: string) => {
    return language === "odia" ? odia : english
  }

  return <LanguageContext.Provider value={{ language, setLanguage, getText }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
