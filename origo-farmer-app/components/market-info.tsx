"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import { AudioButton } from "@/components/audio-button"
import { useLanguage } from "@/contexts/language-context"

interface MarketInfoProps {
  onBack: () => void
}

export function MarketInfo({ onBack }: MarketInfoProps) {
  const { language, getText } = useLanguage()

  const marketData = [
    {
      crop: getText("ଧାନ", "Paddy"),
      price: "₹2,150",
      change: "+50",
      trend: "up",
      unit: getText("କ୍ୱିଣ୍ଟାଲ", "per Quintal"),
    },
    {
      crop: getText("ଟମାଟୋ", "Tomato"),
      price: "₹1,800",
      change: "-120",
      trend: "down",
      unit: getText("କ୍ୱିଣ୍ଟାଲ", "per Quintal"),
    },
    {
      crop: getText("ମକା", "Maize"),
      price: "₹1,950",
      change: "+25",
      trend: "up",
      unit: getText("କ୍ୱିଣ୍ଟାଲ", "per Quintal"),
    },
    {
      crop: getText("ପିଆଜ", "Onion"),
      price: "₹3,200",
      change: "+180",
      trend: "up",
      unit: getText("କ୍ୱିଣ୍ଟାଲ", "per Quintal"),
    },
  ]

  const readAllPrices = () => {
    const priceText = marketData.map((item) => `${item.crop}: ${item.price} ${item.unit}`).join(". ")

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(priceText)
      utterance.lang = language === "odia" ? "or-IN" : "en-IN"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            {getText("ବଜାର ଦର", "Market Prices")}
            <AudioButton text={getText("ବଜାର ଦର", "Market Prices")} />
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <Button onClick={readAllPrices} className="w-full h-12 flex items-center justify-center gap-2">
              <span>{getText("ସମସ୍ତ ଦର ଶୁଣନ୍ତୁ", "Read All Prices")}</span>
              <AudioButton text={getText("ସମସ୍ତ ଦର ଶୁଣନ୍ତୁ", "Read All Prices")} />
            </Button>
          </CardContent>
        </Card>

        {marketData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>{item.crop}</span>
                <div className="flex items-center gap-1">
                  {item.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {item.change}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">{item.price}</span>
                <span className="text-muted-foreground">{item.unit}</span>
              </div>
              <div className="flex justify-end">
                <AudioButton text={`${item.crop}: ${item.price} ${item.unit}`} />
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              {getText("ଶେଷ ଅପଡେଟ୍: ଆଜି ସକାଳ ୧୦:୩ୀ", "Last updated: Today 10:30 AM")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
