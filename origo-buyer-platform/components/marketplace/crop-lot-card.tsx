"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, Clock, Shield, QrCode, Eye, Gavel } from "lucide-react"

interface CropLot {
  id: string
  batchId: string
  crop: string
  quantity: number
  unit: string
  grade: "A" | "B" | "C"
  basePrice: number
  currentBid?: number
  auctionEndTime: string
  location: string
  district: string
  qrVerified: boolean
  onChainVerified: boolean
  farmerVerified: boolean
  imageUrl?: string
}

interface CropLotCardProps {
  lot: CropLot
  onViewDetails: (id: string) => void
  onPlaceBid: (id: string) => void
}

export function CropLotCard({ lot, onViewDetails, onPlaceBid }: CropLotCardProps) {
  const timeRemaining = new Date(lot.auctionEndTime).getTime() - new Date().getTime()
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)))

  const gradeColors = {
    A: "bg-green-100 text-green-800 border-green-200",
    B: "bg-yellow-100 text-yellow-800 border-yellow-200",
    C: "bg-orange-100 text-orange-800 border-orange-200",
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{lot.crop}</h3>
            <p className="text-sm text-muted-foreground">Batch: {lot.batchId}</p>
          </div>
          <Badge className={`${gradeColors[lot.grade]} border`}>Grade {lot.grade}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Quantity</p>
            <p className="font-medium">
              {lot.quantity} {lot.unit}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Base Price</p>
            <p className="font-medium">₹{lot.basePrice.toLocaleString()}</p>
          </div>
        </div>

        {lot.currentBid && (
          <div className="bg-accent/10 p-3 rounded-md">
            <p className="text-sm text-muted-foreground">Current Highest Bid</p>
            <p className="font-semibold text-lg text-primary">₹{lot.currentBid.toLocaleString()}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>
            {lot.location}, {lot.district}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className={hoursRemaining < 24 ? "text-orange-600 font-medium" : "text-muted-foreground"}>
            {hoursRemaining}h remaining
          </span>
        </div>

        <div className="flex items-center gap-2">
          {lot.onChainVerified && (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Shield className="h-3 w-3" />
              On-chain
            </Badge>
          )}
          {lot.qrVerified && (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <QrCode className="h-3 w-3" />
              QR Verified
            </Badge>
          )}
          {lot.farmerVerified && (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Farmer Verified
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(lot.id)} className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          <Button size="sm" onClick={() => onPlaceBid(lot.id)} className="flex-1">
            <Gavel className="h-4 w-4 mr-1" />
            Place Bid
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
