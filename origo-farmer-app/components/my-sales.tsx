"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, QrCode } from "lucide-react"
import { AudioButton } from "@/components/audio-button"
import { useLanguage } from "@/contexts/language-context"

interface MySalesProps {
  onBack: () => void
}

export function MySales({ onBack }: MySalesProps) {
  const { getText } = useLanguage()

  const salesData = [
    {
      id: "LOT001",
      crop: getText("ଧାନ", "Paddy"),
      quantity: "5 " + getText("କ୍ୱିଣ୍ଟାଲ", "Quintals"),
      status: "registered",
      date: "15/03/2024",
    },
    {
      id: "LOT002",
      crop: getText("ଟମାଟୋ", "Tomato"),
      quantity: "2 " + getText("କ୍ୱିଣ୍ଟାଲ", "Quintals"),
      status: "auction",
      date: "12/03/2024",
    },
    {
      id: "LOT003",
      crop: getText("ମକା", "Maize"),
      quantity: "3 " + getText("କ୍ୱିଣ୍ଟାଲ", "Quintals"),
      status: "paid",
      date: "10/03/2024",
    },
  ]

  const getStatusText = (status: string) => {
    switch (status) {
      case "registered":
        return getText("ପଞ୍ଜୀକୃତ", "Registered")
      case "qc":
        return getText("ଗୁଣବତ୍ତା ଯାଞ୍ଚ", "Quality Check")
      case "auction":
        return getText("ନିଲାମ", "Auction")
      case "pickup":
        return getText("ଉଠାଇବା", "Pickup")
      case "paid":
        return getText("ପେମେଣ୍ଟ ହୋଇଗଲା", "Paid")
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registered":
        return "bg-blue-500"
      case "qc":
        return "bg-yellow-500"
      case "auction":
        return "bg-orange-500"
      case "pickup":
        return "bg-purple-500"
      case "paid":
        return "bg-green-500"
      default:
        return "bg-gray-500"
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
            {getText("ମୋର ବିକ୍ରୟ", "My Sales")}
            <AudioButton text={getText("ମୋର ବିକ୍ରୟ", "My Sales")} />
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {salesData.map((sale) => (
          <Card key={sale.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sale.crop}</CardTitle>
                <Button variant="outline" size="sm">
                  <QrCode className="w-4 h-4 mr-1" />
                  {sale.id}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{getText("ପରିମାଣ", "Quantity")}:</span>
                <span className="font-semibold">{sale.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{getText("ତାରିଖ", "Date")}:</span>
                <span>{sale.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{getText("ସ୍ଥିତି", "Status")}:</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(sale.status)}`} />
                  <span className="font-semibold">{getStatusText(sale.status)}</span>
                  <AudioButton text={getStatusText(sale.status)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
