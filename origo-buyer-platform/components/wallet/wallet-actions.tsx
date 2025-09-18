"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, CreditCard, Wallet, AlertCircle } from "lucide-react"

interface WalletActionsProps {
  currentBalance: number
  onDeposit: (amount: number) => void
  onWithdraw: (amount: number) => void
}

export function WalletActions({ currentBalance, onDeposit, onWithdraw }: WalletActionsProps) {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const handleDeposit = async () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) return

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      onDeposit(Number.parseFloat(depositAmount))
      setDepositAmount("")
      setIsProcessing(false)
      setShowDepositModal(false)
    }, 2000)
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0) return

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      onWithdraw(Number.parseFloat(withdrawAmount))
      setWithdrawAmount("")
      setIsProcessing(false)
      setShowWithdrawModal(false)
    }, 2000)
  }

  const quickAmounts = [1000, 5000, 10000, 25000, 50000]

  return (
    <div className="flex gap-4">
      {/* Deposit Modal */}
      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogTrigger asChild>
          <Button className="flex-1">
            <Plus className="h-4 w-4 mr-1" />
            Add Funds
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Funds to Wallet
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Amount (₹)</Label>
              <Input
                id="depositAmount"
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                min="100"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <Label>Quick Select</Label>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amount) => (
                  <Button key={amount} variant="outline" size="sm" onClick={() => setDepositAmount(amount.toString())}>
                    ₹{amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <CreditCard className="h-5 w-5" />
                  <div className="flex-1">
                    <p className="font-medium">UPI / Net Banking</p>
                    <p className="text-sm text-muted-foreground">Instant transfer</p>
                  </div>
                  <Badge variant="default">Recommended</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <Wallet className="h-5 w-5" />
                  <div className="flex-1">
                    <p className="font-medium">Crypto Wallet</p>
                    <p className="text-sm text-muted-foreground">USDC, ETH supported</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Secure Transaction</p>
                  <p className="text-blue-700">
                    Funds are held in escrow and released only after successful transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleDeposit}
                disabled={!depositAmount || Number.parseFloat(depositAmount) < 100 || isProcessing}
                className="flex-1"
              >
                {isProcessing
                  ? "Processing..."
                  : `Add ₹${depositAmount ? Number.parseFloat(depositAmount).toLocaleString() : "0"}`}
              </Button>
              <Button variant="outline" onClick={() => setShowDepositModal(false)} disabled={isProcessing}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Minus className="h-4 w-4 mr-1" />
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Minus className="h-5 w-5" />
              Withdraw Funds
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-lg font-bold">₹{currentBalance.toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawAmount">Amount (₹)</Label>
              <Input
                id="withdrawAmount"
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min="100"
                max={currentBalance}
              />
            </div>

            {/* Bank Account Info */}
            <div className="space-y-3">
              <Label>Withdraw To</Label>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">HDFC Bank ****1234</p>
                    <p className="text-sm text-muted-foreground">Primary account</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Processing Time</p>
                  <p className="text-yellow-700">Withdrawals typically take 1-2 business days to process.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleWithdraw}
                disabled={
                  !withdrawAmount ||
                  Number.parseFloat(withdrawAmount) > currentBalance ||
                  Number.parseFloat(withdrawAmount) < 100 ||
                  isProcessing
                }
                className="flex-1"
              >
                {isProcessing
                  ? "Processing..."
                  : `Withdraw ₹${withdrawAmount ? Number.parseFloat(withdrawAmount).toLocaleString() : "0"}`}
              </Button>
              <Button variant="outline" onClick={() => setShowWithdrawModal(false)} disabled={isProcessing}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
