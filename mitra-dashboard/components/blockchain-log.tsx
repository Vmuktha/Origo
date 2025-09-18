"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, Database, Search, Filter, Download, Hash, Clock, CheckCircle, User, Wheat } from "lucide-react"

interface BlockchainLogProps {
  language: "en" | "od"
}

const translations = {
  en: {
    title: "Blockchain Log Viewer",
    subtitle: "View all blockchain transactions and verified actions",
    searchPlaceholder: "Search by farmer name, transaction ID, or crop type",
    filterBy: "Filter by",
    allActions: "All Actions",
    registration: "Registration",
    verification: "Verification",
    qualityControl: "Quality Control",
    escrow: "Escrow",
    transactionId: "Transaction ID",
    timestamp: "Timestamp",
    action: "Action",
    farmer: "Farmer",
    cropType: "Crop Type",
    status: "Status",
    verified: "Verified",
    pending: "Pending",
    failed: "Failed",
    viewDetails: "View Details",
    downloadLog: "Download Log",
    exportAll: "Export All",
    blockHash: "Block Hash",
    gasUsed: "Gas Used",
    confirmations: "Confirmations",
  },
  od: {
    title: "ବ୍ଲକଚେନ୍ ଲଗ୍ ଭିଉଅର",
    subtitle: "ସମସ୍ତ ବ୍ଲକଚେନ୍ ଟ୍ରାନଜାକ୍ସନ ଏବଂ ଯାଞ୍ଚିତ କାର୍ଯ୍ୟ ଦେଖନ୍ତୁ",
    searchPlaceholder: "କୃଷକଙ୍କ ନାମ, ଟ୍ରାନଜାକ୍ସନ ID, କିମ୍ବା ଫସଲ ପ୍ରକାର ଦ୍ୱାରା ଖୋଜନ୍ତୁ",
    filterBy: "ଫିଲ୍ଟର କରନ୍ତୁ",
    allActions: "ସମସ୍ତ କାର୍ଯ୍ୟ",
    registration: "ପଞ୍ଜୀକରଣ",
    verification: "ଯାଞ୍ଚ",
    qualityControl: "ଗୁଣବତ୍ତା ନିୟନ୍ତ୍ରଣ",
    escrow: "ଏସ୍କ୍ରୋ",
    transactionId: "ଟ୍ରାନଜାକ୍ସନ ID",
    timestamp: "ସମୟ ଚିହ୍ନ",
    action: "କାର୍ଯ୍ୟ",
    farmer: "କୃଷକ",
    cropType: "ଫସଲ ପ୍ରକାର",
    status: "ସ୍ଥିତି",
    verified: "ଯାଞ୍ଚିତ",
    pending: "ବିଚାରାଧୀନ",
    failed: "ବିଫଳ",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    downloadLog: "ଲଗ୍ ଡାଉନଲୋଡ୍",
    exportAll: "ସବୁ ଏକ୍ସପୋର୍ଟ",
    blockHash: "ବ୍ଲକ ହ୍ୟାସ୍",
    gasUsed: "ଗ୍ୟାସ ବ୍ୟବହୃତ",
    confirmations: "ନିଶ୍ଚିତକରଣ",
  },
}

const blockchainLogs = [
  {
    id: 1,
    transactionId: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    timestamp: "2024-01-15 14:30:25",
    action: "registration",
    farmer: "Ramesh Kumar",
    cropType: "Rice",
    status: "verified",
    blockHash: "0xabcdef1234567890fedcba0987654321abcdef12",
    gasUsed: "21000",
    confirmations: 12,
  },
  {
    id: 2,
    transactionId: "0x9876543210fedcba0987654321abcdef09876543",
    timestamp: "2024-01-15 13:45:10",
    action: "verification",
    farmer: "Sunita Devi",
    cropType: "Wheat",
    status: "verified",
    blockHash: "0xfedcba0987654321abcdef1234567890fedcba09",
    gasUsed: "45000",
    confirmations: 8,
  },
  {
    id: 3,
    transactionId: "0xabcdef1234567890fedcba0987654321abcdef09",
    timestamp: "2024-01-15 12:20:45",
    action: "qualityControl",
    farmer: "Prakash Singh",
    cropType: "Maize",
    status: "pending",
    blockHash: "0x1234567890abcdef1234567890abcdef12345678",
    gasUsed: "32000",
    confirmations: 3,
  },
  {
    id: 4,
    transactionId: "0xfedcba0987654321abcdef1234567890fedcba09",
    timestamp: "2024-01-15 11:15:30",
    action: "escrow",
    farmer: "Meera Patel",
    cropType: "Cotton",
    status: "verified",
    blockHash: "0x9876543210fedcba0987654321abcdef09876543",
    gasUsed: "67000",
    confirmations: 15,
  },
  {
    id: 5,
    transactionId: "0x1111222233334444555566667777888899990000",
    timestamp: "2024-01-14 16:45:20",
    action: "registration",
    farmer: "Raj Kumar",
    cropType: "Turmeric",
    status: "failed",
    blockHash: "0xaaabbbbccccddddeeeeffffgggghhhhiiiijjjj",
    gasUsed: "18000",
    confirmations: 0,
  },
]

export default function BlockchainLog({ language }: BlockchainLogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [selectedLog, setSelectedLog] = useState<number | null>(null)
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
      verified: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      failed: { color: "bg-red-100 text-red-800", icon: Hash },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {t[status as keyof typeof t]}
      </Badge>
    )
  }

  const getActionBadge = (action: string) => {
    const actionConfig = {
      registration: { color: "bg-blue-100 text-blue-800", icon: User },
      verification: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      qualityControl: { color: "bg-purple-100 text-purple-800", icon: Wheat },
      escrow: { color: "bg-orange-100 text-orange-800", icon: Database },
    }
    const config = actionConfig[action as keyof typeof actionConfig]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {t[action as keyof typeof t]}
      </Badge>
    )
  }

  const filteredLogs = blockchainLogs.filter((log) => {
    const matchesSearch =
      log.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.cropType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterAction === "all" || log.action === filterAction

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Database className="h-5 w-5" />
            {t.title}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.title)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-400"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-48 border-green-200 focus:border-green-400">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allActions}</SelectItem>
                  <SelectItem value="registration">{t.registration}</SelectItem>
                  <SelectItem value="verification">{t.verification}</SelectItem>
                  <SelectItem value="qualityControl">{t.qualityControl}</SelectItem>
                  <SelectItem value="escrow">{t.escrow}</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                {t.exportAll}
              </Button>
            </div>
          </div>

          {/* Blockchain Log Table */}
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="border border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getActionBadge(log.action)}
                      {getStatusBadge(log.status)}
                      <span className="text-sm text-green-600">{log.timestamp}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm text-green-600">{t.farmer}</p>
                          <p className="font-semibold text-green-800">{log.farmer}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Wheat className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm text-green-600">{t.cropType}</p>
                          <p className="font-semibold text-green-800">{log.cropType}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm text-green-600">{t.confirmations}</p>
                          <p className="font-semibold text-green-800">{log.confirmations}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-green-600 mb-1">{t.transactionId}</p>
                        <p className="text-xs font-mono text-green-800 break-all bg-white p-2 rounded border border-green-200">
                          {log.transactionId}
                        </p>
                      </div>

                      {selectedLog === log.id && (
                        <div className="space-y-2 mt-4 p-4 bg-white rounded border border-green-200">
                          <div>
                            <p className="text-sm text-green-600 mb-1">{t.blockHash}</p>
                            <p className="text-xs font-mono text-green-800 break-all bg-green-50 p-2 rounded">
                              {log.blockHash}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-green-600">{t.gasUsed}</p>
                              <p className="font-semibold text-green-800">{log.gasUsed}</p>
                            </div>
                            <div>
                              <p className="text-sm text-green-600">{t.confirmations}</p>
                              <p className="font-semibold text-green-800">{log.confirmations}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                    className="border-green-200 text-green-700 hover:bg-green-100"
                  >
                    {selectedLog === log.id ? "Hide Details" : t.viewDetails}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-100 bg-transparent"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {t.downloadLog}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <Database className="h-12 w-12 text-green-300 mx-auto mb-4" />
              <p className="text-green-600">No blockchain logs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
