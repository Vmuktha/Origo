"use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [language, setLanguage] = useState<"en" | "od">("en")

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} language={language} setLanguage={setLanguage} />
  }

  return <Dashboard language={language} setLanguage={setLanguage} onLogout={handleLogout} />
}
