import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Wallet, Clock } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalBids: number
    activeBids: number
    wonAuctions: number
    totalSpent: number
    avgBidAmount: number
    successRate: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.activeBids}</div>
          <p className="text-xs text-muted-foreground">{stats.totalBids} total bids placed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Won Auctions</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.wonAuctions}</div>
          <p className="text-xs text-muted-foreground">{stats.successRate}% success rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">₹{stats.totalSpent.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">₹{stats.avgBidAmount.toLocaleString()} avg bid</p>
        </CardContent>
      </Card>
    </div>
  )
}
