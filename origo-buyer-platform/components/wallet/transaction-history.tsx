import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Lock, Unlock, ExternalLink, Filter } from "lucide-react"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "bid_collateral" | "refund" | "payment" | "escrow_release"
  amount: number
  status: "completed" | "pending" | "failed"
  timestamp: string
  description: string
  batchId?: string
  txHash?: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "bid_collateral":
        return <Lock className="h-4 w-4 text-orange-600" />
      case "refund":
        return <Unlock className="h-4 w-4 text-green-600" />
      case "payment":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      case "escrow_release":
        return <Unlock className="h-4 w-4 text-primary" />
      default:
        return <ArrowUpRight className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="text-xs">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="text-xs">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="text-xs">
            Failed
          </Badge>
        )
    }
  }

  const formatAmount = (amount: number, type: Transaction["type"]) => {
    const sign = ["deposit", "refund", "escrow_release"].includes(type) ? "+" : "-"
    return `${sign}₹${amount.toLocaleString()}`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                    {transaction.batchId && (
                      <>
                        <span>•</span>
                        <span>{transaction.batchId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      ["deposit", "refund", "escrow_release"].includes(transaction.type)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </p>
                  {getStatusBadge(transaction.status)}
                </div>

                {transaction.txHash && (
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
