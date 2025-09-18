"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { Dashboard } from "@/components/dashboard"
import { SellCropFlow } from "@/components/sell-crop-flow"
import { MySales } from "@/components/my-sales"
import { MarketInfo } from "@/components/market-info"
import { AIScan } from "@/components/ai-scan"
import { Bidding } from "@/components/bidding"

export type Screen = "login" | "dashboard" | "sell" | "sales" | "market" | "ai-scan" | "bidding"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentScreen("dashboard")
  }

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "dashboard" && <Dashboard onNavigate={navigateToScreen} />}
      {currentScreen === "sell" && <SellCropFlow onBack={() => navigateToScreen("dashboard")} />}
      {currentScreen === "sales" && <MySales onBack={() => navigateToScreen("dashboard")} />}
      {currentScreen === "market" && <MarketInfo onBack={() => navigateToScreen("dashboard")} />}
      {currentScreen === "ai-scan" && <AIScan onBack={() => navigateToScreen("dashboard")} />}
      {currentScreen === "bidding" && <Bidding onBack={() => navigateToScreen("dashboard")} />}
    </div>
  )
}
