"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, CheckCircle, User, ArrowLeft, BarChart3 } from "lucide-react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { BidManagement } from "@/components/dashboard/bid-management"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
import Link from "next/link"

// Mock data
const mockStats = {
  totalBids: 12,
  activeBids: 3,
  wonAuctions: 4,
  totalSpent: 185000,
  avgBidAmount: 15417,
  successRate: 33,
}

const mockBids = [
  {
    id: "1",
    batchId: "B-001234",
    crop: "Basmati Rice",
    bidAmount: 47500,
    status: "winning" as const,
    currentHighestBid: 47500,
    isMyBid: true,
    auctionEndTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    batchId: "B-001235",
    crop: "Turmeric",
    bidAmount: 19000,
    status: "outbid" as const,
    currentHighestBid: 19200,
    isMyBid: false,
    auctionEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    batchId: "B-001236",
    crop: "Cotton",
    bidAmount: 56000,
    status: "active" as const,
    currentHighestBid: 57000,
    isMyBid: false,
    auctionEndTime: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    batchId: "B-001228",
    crop: "Wheat",
    bidAmount: 32000,
    status: "won" as const,
    currentHighestBid: 32000,
    isMyBid: true,
    auctionEndTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    batchId: "B-001225",
    crop: "Onion",
    bidAmount: 28000,
    status: "lost" as const,
    currentHighestBid: 29500,
    isMyBid: false,
    auctionEndTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
]

const mockNotifications = [
  {
    id: "1",
    type: "payment_due" as const,
    title: "Payment Required",
    message: "Complete payment for Turmeric batch B-001235 within 18 hours to secure your purchase.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionRequired: true,
    batchId: "B-001235",
  },
  {
    id: "2",
    type: "bid_update" as const,
    title: "You've been outbid",
    message: "Your bid on Cotton batch B-001236 has been exceeded. Current highest bid: ₹57,000",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionRequired: false,
    batchId: "B-001236",
  },
  {
    id: "3",
    type: "auction_won" as const,
    title: "Congratulations! You won",
    message: "You've successfully won the auction for Basmati Rice batch B-001234 with a bid of ₹47,500",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionRequired: false,
    batchId: "B-001234",
  },
  {
    id: "4",
    type: "escrow_released" as const,
    title: "Escrow Released",
    message: "₹9,500 collateral has been released back to your wallet for batch B-001230",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionRequired: false,
    batchId: "B-001230",
  },
  {
    id: "5",
    type: "system" as const,
    title: "New Quality Certificates",
    message: "APEDA certification documents are now available for export-ready lots",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionRequired: false,
  },
]

export default function DashboardPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleViewDetails = (batchId: string) => {
    console.log("View details for batch:", batchId)
  }

  const handleIncreaseBid = (bidId: string) => {
    console.log("Increase bid for:", bidId)
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Origo</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Verified Buyer
              </Badge>
              <Button variant="outline" size="sm">
                ଓଡ଼ିଆ
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground">Manage your bids and track your activity</p>
            </div>
            <Button>
              <BarChart3 className="h-4 w-4 mr-1" />
              View Analytics
            </Button>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats stats={mockStats} />

          {/* Main Content Tabs */}
          <Tabs defaultValue="bids" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bids">My Bids</TabsTrigger>
              <TabsTrigger value="notifications" className="relative">
                Notifications
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bids" className="space-y-6">
              <BidManagement bids={mockBids} onViewDetails={handleViewDetails} onIncreaseBid={handleIncreaseBid} />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationsPanel
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDismiss={handleDismissNotification}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
