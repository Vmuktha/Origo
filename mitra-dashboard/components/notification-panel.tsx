"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Volume2, Bell, Phone, AlertTriangle, CheckCircle, Clock, User, Smartphone } from "lucide-react"

interface NotificationPanelProps {
  language: "en" | "od"
}

const translations = {
  en: {
    title: "Notifications & Support",
    subtitle: "Alerts and support requests from farmers",
    ivrCalls: "IVR Calls",
    aiScanFailures: "AI Scan Failures",
    systemAlerts: "System Alerts",
    farmerName: "Farmer Name",
    phoneNumber: "Phone Number",
    issue: "Issue",
    timestamp: "Timestamp",
    priority: "Priority",
    high: "High",
    medium: "Medium",
    low: "Low",
    resolved: "Resolved",
    pending: "Pending",
    inProgress: "In Progress",
    callBack: "Call Back",
    markResolved: "Mark Resolved",
    viewDetails: "View Details",
    noSmartphone: "No smartphone available",
    scanFailed: "AI scan failed",
    needsAssistance: "Needs assistance",
    systemMaintenance: "System maintenance",
    clearAll: "Clear All",
    markAllRead: "Mark All Read",
  },
  od: {
    title: "ବିଜ୍ଞପ୍ତି ଏବଂ ସହାୟତା",
    subtitle: "କୃଷକମାନଙ୍କଠାରୁ ଆଲର୍ଟ ଏବଂ ସହାୟତା ଅନୁରୋଧ",
    ivrCalls: "IVR କଲ୍",
    aiScanFailures: "AI ସ୍କାନ ବିଫଳତା",
    systemAlerts: "ସିଷ୍ଟମ ଆଲର୍ଟ",
    farmerName: "କୃଷକଙ୍କ ନାମ",
    phoneNumber: "ଫୋନ ନମ୍ବର",
    issue: "ସମସ୍ୟା",
    timestamp: "ସମୟ ଚିହ୍ନ",
    priority: "ପ୍ରାଥମିକତା",
    high: "ଉଚ୍ଚ",
    medium: "ମଧ୍ୟମ",
    low: "ନିମ୍ନ",
    resolved: "ସମାଧାନ ହୋଇଛି",
    pending: "ବିଚାରାଧୀନ",
    inProgress: "ଚାଲିଛି",
    callBack: "ପୁନଃ କଲ୍",
    markResolved: "ସମାଧାନ ଚିହ୍ନିତ",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    noSmartphone: "ସ୍ମାର୍ଟଫୋନ ଉପଲବ୍ଧ ନାହିଁ",
    scanFailed: "AI ସ୍କାନ ବିଫଳ",
    needsAssistance: "ସହାୟତା ଆବଶ୍ୟକ",
    systemMaintenance: "ସିଷ୍ଟମ ରକ୍ଷଣାବେକ୍ଷଣ",
    clearAll: "ସବୁ ସଫା କରନ୍ତୁ",
    markAllRead: "ସବୁ ପଢ଼ାଯାଇଛି ଚିହ୍ନିତ",
  },
}

const notifications = [
  {
    id: 1,
    type: "ivr",
    farmerName: "Ramesh Kumar",
    phoneNumber: "+91 9876543210",
    issue: "noSmartphone",
    priority: "high",
    status: "pending",
    timestamp: "2024-01-15 14:30:25",
    description: "Farmer called IVR system for crop registration assistance",
  },
  {
    id: 2,
    type: "ai-scan",
    farmerName: "Sunita Devi",
    phoneNumber: "+91 9876543211",
    issue: "scanFailed",
    priority: "medium",
    status: "in-progress",
    timestamp: "2024-01-15 13:45:10",
    description: "AI crop quality scan failed due to poor image quality",
  },
  {
    id: 3,
    type: "support",
    farmerName: "Prakash Singh",
    phoneNumber: "+91 9876543212",
    issue: "needsAssistance",
    priority: "medium",
    status: "pending",
    timestamp: "2024-01-15 12:20:45",
    description: "Farmer needs help with crop verification process",
  },
  {
    id: 4,
    type: "system",
    farmerName: "System Alert",
    phoneNumber: "N/A",
    issue: "systemMaintenance",
    priority: "low",
    status: "resolved",
    timestamp: "2024-01-15 11:15:30",
    description: "Scheduled system maintenance completed successfully",
  },
]

export default function NotificationPanel({ language }: NotificationPanelProps) {
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null)
  const t = translations[language]

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-US" : "or-IN"
      speechSynthesis.speak(utterance)
    }
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
      medium: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      low: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    }
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {t[priority as keyof typeof t]}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      "in-progress": { color: "bg-blue-100 text-blue-800", icon: AlertTriangle },
      resolved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
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

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      ivr: Phone,
      "ai-scan": Smartphone,
      support: User,
      system: AlertTriangle,
    }
    return typeIcons[type as keyof typeof typeIcons] || Bell
  }

  const handleCallBack = (notificationId: number) => {
    playAudio(language === "en" ? "Initiating callback to farmer" : "କୃଷକଙ୍କୁ ପୁନଃ କଲ୍ ଆରମ୍ଭ କରାଯାଉଛି")
  }

  const handleMarkResolved = (notificationId: number) => {
    playAudio(language === "en" ? "Notification marked as resolved" : "ବିଜ୍ଞପ୍ତି ସମାଧାନ ହୋଇଛି ବୋଲି ଚିହ୍ନିତ")
  }

  const unreadCount = notifications.filter((n) => n.status !== "resolved").length

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <div className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            {t.title}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.title)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Badge variant="outline" className="border-green-200 text-green-700">
                {unreadCount} Pending
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                {t.markAllRead}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                {t.clearAll}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type)

              return (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    notification.status === "resolved"
                      ? "border-green-200 bg-green-50/50"
                      : "border-green-200 bg-green-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <TypeIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-green-800">{notification.farmerName}</h4>
                          {getPriorityBadge(notification.priority)}
                          {getStatusBadge(notification.status)}
                        </div>
                        <p className="text-sm text-green-600">{notification.phoneNumber}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-500">{notification.timestamp}</span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-green-600 mb-1">{t.issue}:</p>
                    <p className="text-sm font-medium text-green-800">{t[notification.issue as keyof typeof t]}</p>
                    <p className="text-sm text-green-600 mt-1">{notification.description}</p>
                  </div>

                  <div className="flex gap-2">
                    {notification.status !== "resolved" && notification.type === "ivr" && (
                      <Button
                        onClick={() => handleCallBack(notification.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        {t.callBack}
                      </Button>
                    )}

                    {notification.status !== "resolved" && (
                      <Button
                        onClick={() => handleMarkResolved(notification.id)}
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-700 hover:bg-green-100"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t.markResolved}
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedNotification(selectedNotification === notification.id ? null : notification.id)
                      }
                      className="border-green-200 text-green-700 hover:bg-green-100"
                    >
                      {selectedNotification === notification.id ? "Hide Details" : t.viewDetails}
                    </Button>
                  </div>

                  {selectedNotification === notification.id && (
                    <div className="mt-4 p-4 bg-white rounded border border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">Additional Details</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-600">Type: {notification.type}</p>
                          <p className="text-green-600">Priority: {notification.priority}</p>
                        </div>
                        <div>
                          <p className="text-green-600">Status: {notification.status}</p>
                          <p className="text-green-600">Time: {notification.timestamp}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-green-600">Description:</p>
                        <p className="text-green-800">{notification.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-green-300 mx-auto mb-4" />
              <p className="text-green-600">No notifications at this time.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
