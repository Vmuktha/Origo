"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Shield, QrCode, Gavel, Phone, Lock, ExternalLink, FileText, User, Package } from "lucide-react"

interface LotDetailModalProps {
  isOpen: boolean
  onClose: () => void
  lotId: string
}

// Mock detailed lot data
const mockLotDetail = {
  id: "1",
  batchId: "B-001234",
  crop: "Basmati Rice",
  variety: "Pusa Basmati 1121",
  quantity: 500,
  unit: "kg",
  grade: "A",
  basePrice: 45000,
  currentBid: 47500,
  minimumIncrement: 500,
  auctionEndTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
  location: "Kendrapara Village",
  district: "Cuttack",
  state: "Odisha",
  qrVerified: true,
  onChainVerified: true,
  farmerVerified: true,
  expectedPickupDate: "2024-01-15",
  description:
    "Premium quality Basmati rice harvested from organic farms. Properly dried and stored in controlled conditions.",

  // Provenance timeline
  provenance: [
    {
      event: "Farmer Registration",
      timestamp: "2024-01-01T10:00:00Z",
      hash: "0x1a2b3c4d...",
      status: "verified",
    },
    {
      event: "Quality Check Uploaded",
      timestamp: "2024-01-05T14:30:00Z",
      hash: "0x5e6f7g8h...",
      status: "verified",
    },
    {
      event: "Mitra Verification",
      timestamp: "2024-01-06T09:15:00Z",
      hash: "0x9i0j1k2l...",
      status: "verified",
    },
    {
      event: "Auction Started",
      timestamp: "2024-01-08T08:00:00Z",
      hash: "0xm3n4o5p6...",
      status: "active",
    },
  ],

  // Bidding history
  bidHistory: [
    { bidder: "Buyer***123", amount: 47500, timestamp: "2024-01-08T15:30:00Z" },
    { bidder: "Buyer***456", amount: 47000, timestamp: "2024-01-08T14:15:00Z" },
    { bidder: "Buyer***789", amount: 46500, timestamp: "2024-01-08T13:45:00Z" },
    { bidder: "Buyer***123", amount: 46000, timestamp: "2024-01-08T12:30:00Z" },
    { bidder: "Buyer***456", amount: 45500, timestamp: "2024-01-08T11:00:00Z" },
  ],

  // Quality certificates
  certificates: [
    { name: "Organic Certification", issuer: "APEDA", date: "2024-01-01", verified: true },
    { name: "Quality Grade Report", issuer: "FPO Lab", date: "2024-01-05", verified: true },
    { name: "Pesticide Residue Test", issuer: "Govt Lab", date: "2024-01-04", verified: true },
  ],
}

export function LotDetailModal({ isOpen, onClose, lotId }: LotDetailModalProps) {
  const [bidAmount, setBidAmount] = useState("")
  const [showBidConfirm, setShowBidConfirm] = useState(false)
  const [isPlacingBid, setIsPlacingBid] = useState(false)

  const lot = mockLotDetail
  const timeRemaining = new Date(lot.auctionEndTime).getTime() - new Date().getTime()
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)))
  const minutesRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)))

  const handlePlaceBid = async () => {
    setIsPlacingBid(true)
    // Simulate bid placement
    setTimeout(() => {
      setIsPlacingBid(false)
      setShowBidConfirm(false)
      setBidAmount("")
      // In real app, this would update the lot data
    }, 2000)
  }

  const suggestedBid = lot.currentBid + lot.minimumIncrement

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {lot.crop} - {lot.batchId}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Lot Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Crop & Variety</Label>
                    <p className="font-medium">{lot.crop}</p>
                    <p className="text-sm text-muted-foreground">{lot.variety}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Quantity</Label>
                    <p className="font-medium">
                      {lot.quantity} {lot.unit}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Quality Grade</Label>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Grade {lot.grade}</Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Expected Pickup</Label>
                    <p className="font-medium">{lot.expectedPickupDate}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {lot.location}, {lot.district}, {lot.state}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="text-sm mt-1">{lot.description}</p>
                </div>

                {/* Verification Badges */}
                <div className="flex flex-wrap gap-2">
                  {lot.onChainVerified && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      On-chain Verified
                    </Badge>
                  )}
                  {lot.qrVerified && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <QrCode className="h-3 w-3" />
                      QR Verified
                    </Badge>
                  )}
                  {lot.farmerVerified && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Farmer Verified
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tabs for detailed information */}
            <Tabs defaultValue="provenance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="provenance">Provenance</TabsTrigger>
                <TabsTrigger value="bids">Bid History</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="provenance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Provenance Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lot.provenance.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              event.status === "verified" ? "bg-green-500" : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{event.event}</h4>
                              <Badge variant={event.status === "verified" ? "default" : "secondary"}>
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.timestamp).toLocaleString()}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs bg-muted px-2 py-1 rounded">{event.hash}</code>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bids" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bidding Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lot.bidHistory.map((bid, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">₹{bid.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{bid.bidder}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{new Date(bid.timestamp).toLocaleString()}</p>
                            {index === 0 && (
                              <Badge variant="default" className="text-xs">
                                Highest
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quality Certificates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lot.certificates.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Issued by {cert.issuer} • {cert.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {cert.verified && (
                              <Badge variant="default" className="text-xs">
                                Verified
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Bidding Panel */}
          <div className="space-y-6">
            {/* Auction Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Auction Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {hoursRemaining}h {minutesRemaining}m
                  </p>
                  <p className="text-sm text-muted-foreground">Time remaining</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-medium">₹{lot.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Bid</span>
                    <span className="font-bold text-lg text-primary">₹{lot.currentBid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Increment</span>
                    <span className="font-medium">₹{lot.minimumIncrement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bidding Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Place Bid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showBidConfirm ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bidAmount">Your Bid Amount (₹)</Label>
                      <Input
                        id="bidAmount"
                        type="number"
                        placeholder={suggestedBid.toString()}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={suggestedBid}
                      />
                      <p className="text-xs text-muted-foreground">Minimum bid: ₹{suggestedBid.toLocaleString()}</p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setShowBidConfirm(true)}
                      disabled={!bidAmount || Number.parseInt(bidAmount) < suggestedBid}
                    >
                      Review Bid
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setBidAmount(suggestedBid.toString())}
                    >
                      Quick Bid: ₹{suggestedBid.toLocaleString()}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Confirm Your Bid</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Bid Amount:</span>
                          <span className="font-bold">₹{Number.parseInt(bidAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Collateral (20%):</span>
                          <span>₹{Math.round(Number.parseInt(bidAmount) * 0.2).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="font-medium text-yellow-800 mb-1">Important:</p>
                      <p>
                        20% collateral will be locked in escrow. If you win, you'll need to complete payment within 24
                        hours.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handlePlaceBid} disabled={isPlacingBid} className="flex-1">
                        {isPlacingBid ? "Placing Bid..." : "Confirm Bid"}
                      </Button>
                      <Button variant="outline" onClick={() => setShowBidConfirm(false)} disabled={isPlacingBid}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Farmer Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Contact locked until escrow confirmed</span>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Request Pickup (Mitra)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Request Masked Contact
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Farmer details will be revealed after winning auction and escrow confirmation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
