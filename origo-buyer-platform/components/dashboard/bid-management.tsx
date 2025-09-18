"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Gavel, CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react"

interface Bid {
  id: string
  batchId: string
  crop: string
  bidAmount: number
  status: "active" | "winning" | "outbid" | "won" | "lost"
  timeRemaining?: string
  currentHighestBid?: number
  isMyBid: boolean
  auctionEndTime: string
}

interface BidManagementProps {
  bids: Bid[]
  onViewDetails: (batchId: string) => void
  onIncreaseBid: (bidId: string) => void
}

export function BidManagement({ bids, onViewDetails, onIncreaseBid }: BidManagementProps) {
  const getStatusInfo = (status: Bid["status"]) => {
    switch (status) {
      case "active":
        return {
          label: "Active",
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Clock className="h-3 w-3" />,
        }
      case "winning":
        return {
          label: "Winning",
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-3 w-3" />,
        }
      case "outbid":
        return {
          label: "Outbid",
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: <AlertTriangle className="h-3 w-3" />,
        }
      case "won":
        return {
          label: "Won",
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-3 w-3" />,
        }
      case "lost":
        return {
          label: "Lost",
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <XCircle className="h-3 w-3" />,
        }
    }
  }

  const activeBids = bids.filter((bid) => ["active", "winning", "outbid"].includes(bid.status))
  const completedBids = bids.filter((bid) => ["won", "lost"].includes(bid.status))

  return (
    <div className="space-y-6">
      {/* Active Bids */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5" />
            Active Bids ({activeBids.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeBids.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Gavel className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active bids</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBids.map((bid) => {
                const statusInfo = getStatusInfo(bid.status)
                const timeRemaining = new Date(bid.auctionEndTime).getTime() - new Date().getTime()
                const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)))
                const minutesRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)))

                return (
                  <div key={bid.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{bid.crop}</h4>
                        <p className="text-sm text-muted-foreground">{bid.batchId}</p>
                      </div>
                      <Badge className={`${statusInfo.color} border flex items-center gap-1`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Your Bid</p>
                        <p className="font-medium">₹{bid.bidAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Highest</p>
                        <p className="font-medium">₹{bid.currentHighestBid?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Left</p>
                        <p className="font-medium">
                          {hoursRemaining}h {minutesRemaining}m
                        </p>
                      </div>
                    </div>

                    {bid.status === "outbid" && (
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-800">
                          You've been outbid! Current highest bid is ₹{bid.currentHighestBid?.toLocaleString()}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => onViewDetails(bid.batchId)} className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {bid.status === "outbid" && (
                        <Button size="sm" onClick={() => onIncreaseBid(bid.id)} className="flex-1">
                          Increase Bid
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Completed Bids */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
        </CardHeader>
        <CardContent>
          {completedBids.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No completed bids yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedBids.slice(0, 5).map((bid) => {
                const statusInfo = getStatusInfo(bid.status)
                return (
                  <div key={bid.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{bid.crop}</p>
                      <p className="text-sm text-muted-foreground">{bid.batchId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{bid.bidAmount.toLocaleString()}</p>
                      <Badge className={`${statusInfo.color} border text-xs`}>{statusInfo.label}</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
