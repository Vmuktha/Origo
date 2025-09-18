"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, CheckCircle, User, ArrowLeft } from "lucide-react"
import { WalletOverview } from "@/components/wallet/wallet-overview"
import { TransactionHistory } from "@/components/wallet/transaction-history"
import { EscrowTracker } from "@/components/wallet/escrow-tracker"
import { WalletActions } from "@/components/wallet/wallet-actions"
import Link from "next/link"

// Mock data
const mockTransactions = [
  {
    id: "1",
    type: "deposit" as const,
    amount: 50000,
    status: "completed" as const,
    timestamp: "2024-01-08T10:30:00Z",
    description: "Wallet deposit via UPI",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
  },
  {
    id: "2",
    type: "bid_collateral" as const,
    amount: 9500,
    status: "completed" as const,
    timestamp: "2024-01-08T15:30:00Z",
    description: "Bid collateral locked",
    batchId: "B-001234",
  },
  {
    id: "3",
    type: "refund" as const,
    amount: 9000,
    status: "pending" as const,
    timestamp: "2024-01-07T14:15:00Z",
    description: "Bid refund processing",
    batchId: "B-001230",
  },
  {
    id: "4",
    type: "payment" as const,
    amount: 47500,
    status: "completed" as const,
    timestamp: "2024-01-06T09:45:00Z",
    description: "Auction payment",
    batchId: "B-001228",
    txHash: "0x9i8h7g6f5e4d3c2b1a0z9y8x7w6v5u4t",
  },
]

const mockEscrowItems = [
  {
    id: "1",
    batchId: "B-001234",
    crop: "Basmati Rice",
    amount: 47500,
    collateralAmount: 9500,
    status: "active_bid" as const,
    timeRemaining: "18h 30m",
    description: "Premium quality Basmati rice - 500kg",
  },
  {
    id: "2",
    batchId: "B-001235",
    crop: "Turmeric",
    amount: 19200,
    collateralAmount: 3840,
    status: "won_pending_payment" as const,
    paymentDeadline: "Jan 10, 2024 6:00 PM",
    description: "Organic turmeric - 200kg",
  },
]

export default function WalletPage() {
  const [walletData, setWalletData] = useState({
    balance: 40500,
    lockedAmount: 13340,
    pendingRefunds: 9000,
  })

  const handleDeposit = (amount: number) => {
    setWalletData((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }))
  }

  const handleWithdraw = (amount: number) => {
    setWalletData((prev) => ({
      ...prev,
      balance: prev.balance - amount,
    }))
  }

  const handleViewEscrowDetails = (id: string) => {
    console.log("View escrow details:", id)
  }

  const handleCompletePayment = (id: string) => {
    console.log("Complete payment for:", id)
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
              <h2 className="text-3xl font-bold text-foreground">Wallet & Escrow</h2>
              <p className="text-muted-foreground">Manage your funds and track escrow transactions</p>
            </div>
          </div>

          {/* Wallet Overview */}
          <WalletOverview
            balance={walletData.balance}
            lockedAmount={walletData.lockedAmount}
            pendingRefunds={walletData.pendingRefunds}
          />

          {/* Wallet Actions */}
          <WalletActions currentBalance={walletData.balance} onDeposit={handleDeposit} onWithdraw={handleWithdraw} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Escrow Tracker */}
            <EscrowTracker
              escrowItems={mockEscrowItems}
              onViewDetails={handleViewEscrowDetails}
              onCompletePayment={handleCompletePayment}
            />

            {/* Transaction History */}
            <TransactionHistory transactions={mockTransactions} />
          </div>
        </div>
      </main>
    </div>
  )
}
