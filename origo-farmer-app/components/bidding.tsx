"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Users } from "lucide-react"
import { AudioButton } from "@/components/audio-button"
import { useLanguage } from "@/contexts/language-context"

interface BiddingProps {
  onBack: () => void
}

export function Bidding({ onBack }: BiddingProps) {
  const { getText } = useLanguage()

  const auctions = [
    {
      id: "AUC001",
      crop: getText("ଧାନ", "Paddy"),
      quantity: "10 " + getText("କ୍ୱିଣ୍ଟାଲ", "Quintals"),
      currentBid: "₹21,500",
      bidders: 5,
      timeLeft: "2h 15m",
      status: "active",
    },
    {
      id: "AUC002",
      crop: getText("ଟମାଟୋ", "Tomato"),
      quantity: "5 " + getText("କ୍ୱିଣ୍ଟାଲ", "Quintals"),
      currentBid: "₹9,200",
      bidders: 3,
      timeLeft: "45m",
      status: "active",
    },
    {
      id: "AUC003",
      crop: getText("ମକା", "Maize"),
      quantity: "8 " + getText("କ୍ୱିଣ୍ଟାଲ", "Quintals"),
      currentBid: "₹15,600",
      bidders: 7,
      timeLeft: "Ended",
      status: "ended",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            {getText("ନିଲାମ", "Bidding")}
            <AudioButton text={getText("ନିଲାମ", "Bidding")} />
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {auctions.map((auction) => (
          <Card key={auction.id} className={auction.status === "ended" ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{auction.crop}</CardTitle>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    auction.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {auction.status === "active" ? getText("ସକ୍ରିୟ", "Active") : getText("ସମାପ୍ତ", "Ended")}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{getText("ପରିମାଣ", "Quantity")}</p>
                  <p className="font-semibold">{auction.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{getText("ବର୍ତ୍ତମାନ ବିଡ୍", "Current Bid")}</p>
                  <p className="font-bold text-primary text-lg">{auction.currentBid}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {auction.bidders} {getText("ବିଡର", "bidders")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">
                    {auction.timeLeft === "Ended" ? getText("ସମାପ୍ତ", "Ended") : auction.timeLeft}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" disabled={auction.status === "ended"}>
                  {getText("ବିସ୍ତାର ଦେଖନ୍ତୁ", "View Details")}
                </Button>
                <AudioButton
                  text={`${auction.crop}, ${auction.quantity}, ${getText("ବର୍ତ୍ତମାନ ବିଡ୍", "Current bid")} ${auction.currentBid}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              {getText("ନୂତନ ନିଲାମ ପାଇଁ ନୋଟିଫିକେସନ୍ ଅନ୍ କରନ୍ତୁ", "Turn on notifications for new auctions")}
            </p>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              {getText("ନୋଟିଫିକେସନ୍ ସେଟିଂସ", "Notification Settings")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
