import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, Lock } from "lucide-react"

interface WalletOverviewProps {
  balance: number
  lockedAmount: number
  pendingRefunds: number
}

export function WalletOverview({ balance, lockedAmount, pendingRefunds }: WalletOverviewProps) {
  const totalBalance = balance + lockedAmount + pendingRefunds

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">₹{balance.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Ready for bidding</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Locked in Escrow</CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">₹{lockedAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Active bids & collateral</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Refunds</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">₹{pendingRefunds.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Processing returns</p>
        </CardContent>
      </Card>
    </div>
  )
}
