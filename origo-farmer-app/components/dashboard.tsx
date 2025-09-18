"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Camera, TrendingUp, Gavel, HelpCircle, Globe } from "lucide-react"
import { AudioButton } from "@/components/audio-button"
import { useLanguage } from "@/contexts/language-context"
import type { Screen } from "@/app/page"

interface DashboardProps {
  onNavigate: (screen: Screen) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { language, setLanguage, getText } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "odia" ? "english" : "odia")
  }

  const dashboardTiles = [
    {
      id: "sell" as Screen,
      icon: ShoppingCart,
      title: getText("ବିକ୍ରୟ", "SELL"),
      subtitle: getText("ଫସଲ ବିକ୍ରୟ କରନ୍ତୁ", "Sell your crops"),
      color: "bg-primary",
    },
    {
      id: "ai-scan" as Screen,
      icon: Camera,
      title: getText("AI ସ୍କ୍ୟାନ୍", "AI SCAN"),
      subtitle: getText("ଫସଲ ଯାଞ୍ଚ କରନ୍ତୁ", "Check crop health"),
      color: "bg-secondary",
    },
    {
      id: "market" as Screen,
      icon: TrendingUp,
      title: getText("ବଜାର ଦର", "MARKET"),
      subtitle: getText("ମଣ୍ଡି ଦର ଦେଖନ୍ତୁ", "View market prices"),
      color: "bg-accent",
    },
    {
      id: "bidding" as Screen,
      icon: Gavel,
      title: getText("ନିଲାମ", "BIDDING"),
      subtitle: getText("ନିଲାମ ଦେଖନ୍ତୁ", "View auctions"),
      color: "bg-chart-2",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{getText("ନମସ୍କାର, କୃଷକ", "Hello, Farmer")}</h1>
            <p className="text-primary-foreground/80">{getText("ଆଜି କଣ କରିବେ?", "What would you like to do today?")}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {language === "odia" ? "EN" : "ଓଡ଼ିଆ"}
          </Button>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="p-4 space-y-6">
        {/* Dashboard Tiles */}
        <div className="grid grid-cols-2 gap-4">
          {dashboardTiles.map((tile) => (
            <Card
              key={tile.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate(tile.id)}
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className={`w-16 h-16 ${tile.color} rounded-full flex items-center justify-center mx-auto`}>
                  <tile.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tile.title}</h3>
                  <p className="text-sm text-muted-foreground text-balance">{tile.subtitle}</p>
                </div>
                <AudioButton text={`${tile.title}. ${tile.subtitle}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              {getText("ଶୀଘ୍ର କାର୍ଯ୍ୟ", "Quick Actions")}
              <AudioButton text={getText("ଶୀଘ୍ର କାର୍ଯ୍ୟ", "Quick Actions")} />
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-between h-12 bg-transparent"
                onClick={() => onNavigate("sales")}
              >
                <span>{getText("ମୋର ବିକ୍ରୟ", "My Sales")}</span>
                <AudioButton text={getText("ମୋର ବିକ୍ରୟ", "My Sales")} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Help Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <Button
          size="lg"
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg flex items-center gap-2 px-6"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-semibold">{getText("ମିତ୍ର ସହାୟତା", "MITRA HELP")}</span>
          <AudioButton text={getText("ମିତ୍ର ସହାୟତା", "MITRA HELP")} />
        </Button>
      </div>
    </div>
  )
}
