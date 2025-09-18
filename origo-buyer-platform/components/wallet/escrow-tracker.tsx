"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Package, CheckCircle, AlertCircle, Eye } from "lucide-react"

interface EscrowItem {
  id: string
  batchId: string
  crop: string
  amount: number
  collateralAmount: number
  status: "active_bid" | "won_pending_payment" | "payment_completed" | "dispute" | "completed"
  timeRemaining?: string
  paymentDeadline?: string
  description: string
}

interface EscrowTrackerProps {
  escrowItems: EscrowItem[]
  onViewDetails: (id: string) => void
  onCompletePayment: (id: string) => void
}

export function EscrowTracker({ escrowItems, onViewDetails, onCompletePayment }: EscrowTrackerProps) {
  const getStatusInfo = (status: EscrowItem["status"]) => {
    switch (status) {
      case "active_bid":
        return {
          label: "Active Bid",
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Clock className="h-3 w-3" />,
        }
      case "won_pending_payment":
        return {
          label: "Payment Required",
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: <AlertCircle className="h-3 w-3" />,
        }
      case "payment_completed":
        return {
          label: "Payment Completed",
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-3 w-3" />,
        }
      case "dispute":
        return {
          label: "Under Dispute",
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertCircle className="h-3 w-3" />,
        }
      case "completed":
        return {
          label: "Completed",
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-3 w-3" />,
        }
    }
  }

  const getProgressValue = (status: EscrowItem["status"]) => {
    switch (status) {
      case "active_bid":
        return 25
      case "won_pending_payment":
        return 50
      case "payment_completed":
        return 75
      case "completed":
        return 100
      case "dispute":
        return 50
      default:
        return 0
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrow Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {escrowItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active escrow transactions</p>
            </div>
          ) : (
            escrowItems.map((item) => {
              const statusInfo = getStatusInfo(item.status)
              return (
                <div key={item.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{item.crop}</h4>
                      <p className="text-sm text-muted-foreground">{item.batchId}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <Badge className={`${statusInfo.color} border flex items-center gap-1`}>
                      {statusInfo.icon}
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-medium">₹{item.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Collateral Locked</p>
                      <p className="font-medium">₹{item.collateralAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{getProgressValue(item.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(item.status)} className="h-2" />
                  </div>

                  {/* Time-sensitive information */}
                  {item.timeRemaining && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-800">Auction ends in {item.timeRemaining}</span>
                      </div>
                    </div>
                  )}

                  {item.paymentDeadline && (
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-orange-800">Payment due by {item.paymentDeadline}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(item.id)} className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>

                    {item.status === "won_pending_payment" && (
                      <Button size="sm" onClick={() => onCompletePayment(item.id)} className="flex-1">
                        Complete Payment
                      </Button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
