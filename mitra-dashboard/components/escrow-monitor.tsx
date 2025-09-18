"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Volume2, DollarSign, Play, CheckCircle, Clock, AlertCircle, User, Wheat, Scale } from "lucide-react"

interface EscrowMonitorProps {
  language: "en" | "od"
}

const translations = {
  en: {
    title: "Escrow/Bidding Monitor",
    subtitle: "Monitor ongoing sales and smart contract status",
    activeSales: "Active Sales",
    farmerName: "Farmer Name",
    cropType: "Crop Type",
    quantity: "Quantity",
    bidAmount: "Bid Amount",
    status: "Status",
    activateContract: "Activate Smart Contract",
    viewContract: "View Contract",
    pending: "Pending",
    active: "Active",
    completed: "Completed",
    failed: "Failed",
    qcPending: "QC Pending",
    qcCompleted: "QC Completed",
    contractActivated: "Contract Activated",
    paymentReleased: "Payment Released",
    saleDate: "Sale Date",
    buyer: "Buyer",
    contractAddress: "Contract Address",
    transactionHash: "Transaction Hash",
    escrowAmount: "Escrow Amount",
    releasePayment: "Release Payment",
    disputeContract: "Dispute Contract",
    recentTransactions: "Recent Transactions",
    viewDetails: "View Details",
    downloadContract: "Download Contract",
    progress: "Progress",
    step1: "Quality Control",
    step2: "Contract Activation",
    step3: "Payment Escrow",
    step4: "Delivery Confirmation",
    step5: "Payment Release",
  },
  od: {
    title: "ଏସ୍କ୍ରୋ/ବିଡିଂ ମନିଟର",
    subtitle: "ଚାଲୁଥିବା ବିକ୍ରୟ ଏବଂ ସ୍ମାର୍ଟ କଣ୍ଟ୍ରାକ୍ଟ ସ୍ଥିତି ମନିଟର",
    activeSales: "ସକ୍ରିୟ ବିକ୍ରୟ",
    farmerName: "କୃଷକଙ୍କ ନାମ",
    cropType: "ଫସଲ ପ୍ରକାର",
    quantity: "ପରିମାଣ",
    bidAmount: "ବିଡ୍ ପରିମାଣ",
    status: "ସ୍ଥିତି",
    activateContract: "ସ୍ମାର୍ଟ କଣ୍ଟ୍ରାକ୍ଟ ସକ୍ରିୟ",
    viewContract: "କଣ୍ଟ୍ରାକ୍ଟ ଦେଖନ୍ତୁ",
    pending: "ବିଚାରାଧୀନ",
    active: "ସକ୍ରିୟ",
    completed: "ସମ୍ପୂର୍ଣ୍ଣ",
    failed: "ବିଫଳ",
    qcPending: "QC ବିଚାରାଧୀନ",
    qcCompleted: "QC ସମ୍ପୂର୍ଣ୍ଣ",
    contractActivated: "କଣ୍ଟ୍ରାକ୍ଟ ସକ୍ରିୟ",
    paymentReleased: "ପେମେଣ୍ଟ ମୁକ୍ତ",
    saleDate: "ବିକ୍ରୟ ତାରିଖ",
    buyer: "କ୍ରେତା",
    contractAddress: "କଣ୍ଟ୍ରାକ୍ଟ ଠିକଣା",
    transactionHash: "ଟ୍ରାନଜାକ୍ସନ ହ୍ୟାସ୍",
    escrowAmount: "ଏସ୍କ୍ରୋ ପରିମାଣ",
    releasePayment: "ପେମେଣ୍ଟ ମୁକ୍ତ କରନ୍ତୁ",
    disputeContract: "କଣ୍ଟ୍ରାକ୍ଟ ବିବାଦ",
    recentTransactions: "ସାମ୍ପ୍ରତିକ ଟ୍ରାନଜାକ୍ସନ",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    downloadContract: "କଣ୍ଟ୍ରାକ୍ଟ ଡାଉନଲୋଡ୍",
    progress: "ପ୍ରଗତି",
    step1: "ଗୁଣବତ୍ତା ନିୟନ୍ତ୍ରଣ",
    step2: "କଣ୍ଟ୍ରାକ୍ଟ ସକ୍ରିୟକରଣ",
    step3: "ପେମେଣ୍ଟ ଏସ୍କ୍ରୋ",
    step4: "ଡେଲିଭରି ନିଶ୍ଚିତକରଣ",
    step5: "ପେମେଣ୍ଟ ମୁକ୍ତି",
  },
}

const activeSales = [
  {
    id: 1,
    farmerName: "Ramesh Kumar",
    cropType: "Rice",
    quantity: "500 kg",
    bidAmount: "₹25,000",
    buyer: "AgriCorp Ltd",
    status: "qc-completed",
    saleDate: "2024-01-15",
    contractAddress: "0x1a2b3c4d5e6f7890abcdef1234567890",
    transactionHash: "0x9876543210fedcba0987654321abcdef",
    escrowAmount: "₹25,000",
    progress: 60,
    currentStep: 3,
  },
  {
    id: 2,
    farmerName: "Sunita Devi",
    cropType: "Wheat",
    quantity: "300 kg",
    bidAmount: "₹18,000",
    buyer: "FarmFresh Co",
    status: "active",
    saleDate: "2024-01-14",
    contractAddress: "0xabcdef1234567890fedcba0987654321",
    transactionHash: "0x1234567890abcdef1234567890abcdef",
    escrowAmount: "₹18,000",
    progress: 80,
    currentStep: 4,
  },
  {
    id: 3,
    farmerName: "Prakash Singh",
    cropType: "Maize",
    quantity: "400 kg",
    bidAmount: "₹20,000",
    buyer: "GrainTech Inc",
    status: "qc-pending",
    saleDate: "2024-01-13",
    contractAddress: "0xfedcba0987654321abcdef1234567890",
    transactionHash: "0xabcdef1234567890abcdef1234567890",
    escrowAmount: "₹20,000",
    progress: 20,
    currentStep: 1,
  },
]

const recentTransactions = [
  {
    id: 1,
    farmerName: "Meera Patel",
    cropType: "Cotton",
    amount: "₹30,000",
    status: "completed",
    date: "2024-01-12",
    transactionHash: "0x1111222233334444555566667777888899990000",
  },
  {
    id: 2,
    farmerName: "Raj Kumar",
    cropType: "Turmeric",
    amount: "₹15,000",
    status: "completed",
    date: "2024-01-11",
    transactionHash: "0xaaabbbbccccddddeeeeffffgggghhhhiiiijjjj",
  },
]

export default function EscrowMonitor({ language }: EscrowMonitorProps) {
  const [selectedSale, setSelectedSale] = useState<number | null>(null)
  const t = translations[language]

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-US" : "or-IN"
      speechSynthesis.speak(utterance)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "qc-pending": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      "qc-completed": { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
      active: { color: "bg-green-100 text-green-800", icon: Play },
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      failed: { color: "bg-red-100 text-red-800", icon: AlertCircle },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {t[status.replace("-", "") as keyof typeof t] || status}
      </Badge>
    )
  }

  const getProgressSteps = (currentStep: number) => {
    const steps = [t.step1, t.step2, t.step3, t.step4, t.step5]
    return steps.map((step, index) => ({
      label: step,
      completed: index < currentStep,
      current: index === currentStep - 1,
    }))
  }

  const handleActivateContract = (saleId: number) => {
    playAudio(language === "en" ? "Smart contract activated successfully" : "ସ୍ମାର୍ଟ କଣ୍ଟ୍ରାକ୍ଟ ସଫଳତାର ସହିତ ସକ୍ରିୟ ହୋଇଛି")
  }

  const handleReleasePayment = (saleId: number) => {
    playAudio(language === "en" ? "Payment released to farmer successfully" : "କୃଷକଙ୍କୁ ପେମେଣ୍ଟ ସଫଳତାର ସହିତ ମୁକ୍ତ କରାଯାଇଛି")
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <DollarSign className="h-5 w-5" />
            {t.title}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.title)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
            {t.activeSales}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.activeSales)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </h3>

          <div className="space-y-6">
            {activeSales.map((sale) => (
              <div key={sale.id} className="border border-green-200 rounded-lg p-6 bg-green-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.farmerName}</p>
                        <p className="font-semibold text-green-800">{sale.farmerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wheat className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.cropType}</p>
                        <p className="font-semibold text-green-800">{sale.cropType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.quantity}</p>
                        <p className="font-semibold text-green-800">{sale.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.bidAmount}</p>
                        <p className="font-semibold text-green-800">{sale.bidAmount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(sale.status)}
                    <p className="text-xs text-green-500">{sale.saleDate}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">{t.progress}</span>
                    <span className="text-sm text-green-600">{sale.progress}%</span>
                  </div>
                  <Progress value={sale.progress} className="h-2 bg-green-100" />
                </div>

                {/* Progress Steps */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    {getProgressSteps(sale.currentStep).map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            step.completed
                              ? "bg-green-600 text-white"
                              : step.current
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <p className="text-xs text-green-600 mt-1 max-w-16 text-balance">{step.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contract Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white rounded-lg border border-green-200">
                  <div>
                    <p className="text-sm text-green-600">{t.buyer}</p>
                    <p className="font-semibold text-green-800">{sale.buyer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">{t.escrowAmount}</p>
                    <p className="font-semibold text-green-800">{sale.escrowAmount}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-green-600 mb-1">{t.contractAddress}</p>
                    <p className="text-xs font-mono text-green-800 break-all bg-green-50 p-2 rounded">
                      {sale.contractAddress}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-green-600 mb-1">{t.transactionHash}</p>
                    <p className="text-xs font-mono text-green-800 break-all bg-green-50 p-2 rounded">
                      {sale.transactionHash}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {sale.status === "qc-completed" && (
                    <Button
                      onClick={() => handleActivateContract(sale.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {t.activateContract}
                    </Button>
                  )}

                  {sale.status === "active" && sale.currentStep >= 4 && (
                    <Button
                      onClick={() => handleReleasePayment(sale.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      {t.releasePayment}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    {t.viewContract}
                  </Button>

                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    {t.downloadContract}
                  </Button>

                  {sale.status === "active" && (
                    <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent">
                      {t.disputeContract}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {t.recentTransactions}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.recentTransactions)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-green-800">{transaction.farmerName}</h4>
                    {getStatusBadge(transaction.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-green-600">
                    <p>
                      <span className="font-medium">{t.cropType}:</span> {transaction.cropType}
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span> {transaction.amount}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {transaction.date}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-green-600 mb-1">{t.transactionHash}:</p>
                    <p className="text-xs font-mono text-green-800 break-all bg-white p-2 rounded border border-green-200">
                      {transaction.transactionHash}
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-100 bg-transparent"
                  >
                    {t.viewDetails}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
