"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Volume2,
  Leaf,
  UserPlus,
  CheckCircle,
  Upload,
  DollarSign,
  Bell,
  Database,
  LogOut,
  FileText,
  TrendingUp,
  Menu,
  X,
  Home,
  Settings,
  HelpCircle,
} from "lucide-react"
import FarmerRegistration from "@/components/farmer-registration"
import CropVerification from "@/components/crop-verification"
import QualityControl from "@/components/quality-control"
import EscrowMonitor from "@/components/escrow-monitor"
import BlockchainLog from "@/components/blockchain-log"
import NotificationPanel from "@/components/notification-panel"

interface DashboardProps {
  language: "en" | "od"
  setLanguage: (lang: "en" | "od") => void
  onLogout: () => void
}

const translations = {
  en: {
    title: "Mitra Dashboard",
    subtitle: "Agriculture Blockchain Platform",
    farmerReg: "Farmer Registration",
    cropVerify: "Crop Verification",
    qualityControl: "Quality Control",
    escrowMonitor: "Escrow Monitor",
    blockchainLog: "Blockchain Log",
    notifications: "Notifications",
    logout: "Logout",
    welcome: "Welcome, Mitra Agent",
    todayStats: "Today's Statistics",
    farmersRegistered: "Farmers Registered",
    cropsVerified: "Crops Verified",
    pendingRequests: "Pending Requests",
    activeContracts: "Active Contracts",
    systemStatus: "System Status: Online",
    lastSync: "Last Sync",
    overview: "Overview",
    quickActions: "Quick Actions",
    recentActivity: "Recent Activity",
    help: "Help & Support",
    settings: "Settings",
  },
  od: {
    title: "ମିତ୍ର ଡ୍ୟାସବୋର୍ଡ",
    subtitle: "କୃଷି ବ୍ଲକଚେନ୍ ପ୍ଲାଟଫର୍ମ",
    farmerReg: "କୃଷକ ପଞ୍ଜୀକରଣ",
    cropVerify: "ଫସଲ ଯାଞ୍ଚ",
    qualityControl: "ଗୁଣବତ୍ତା ନିୟନ୍ତ୍ରଣ",
    escrowMonitor: "ଏସ୍କ୍ରୋ ମନିଟର",
    blockchainLog: "ବ୍ଲକଚେନ୍ ଲଗ୍",
    notifications: "ବିଜ୍ଞପ୍ତି",
    logout: "ଲଗଆଉଟ୍",
    welcome: "ସ୍ୱାଗତ, ମିତ୍ର ଏଜେଣ୍ଟ",
    todayStats: "ଆଜିର ପରିସଂଖ୍ୟାନ",
    farmersRegistered: "ପଞ୍ଜୀକୃତ କୃଷକ",
    cropsVerified: "ଯାଞ୍ଚିତ ଫସଲ",
    pendingRequests: "ବିଚାରାଧୀନ ଅନୁରୋଧ",
    activeContracts: "ସକ୍ରିୟ ଚୁକ୍ତି",
    systemStatus: "ସିଷ୍ଟମ୍ ସ୍ଥିତି: ଅନଲାଇନ୍",
    lastSync: "ଶେଷ ସିଙ୍କ",
    overview: "ସମୀକ୍ଷା",
    quickActions: "ଦ୍ରୁତ କାର୍ଯ୍ୟ",
    recentActivity: "ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ",
    help: "ସାହାଯ୍ୟ ଓ ସହାୟତା",
    settings: "ସେଟିଂସ୍",
  },
}

export default function Dashboard({ language, setLanguage, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-US" : "or-IN"
      speechSynthesis.speak(utterance)
    }
  }

  const handleLogout = () => {
    playAudio(language === "en" ? "Logging out" : "ଲଗଆଉଟ୍ ହେଉଛି")
    onLogout()
  }

  const stats = [
    {
      label: t.farmersRegistered,
      value: "24",
      icon: UserPlus,
      color: "text-green-600",
      trend: "+3",
      bgColor: "bg-green-50",
    },
    {
      label: t.cropsVerified,
      value: "18",
      icon: CheckCircle,
      color: "text-blue-600",
      trend: "+5",
      bgColor: "bg-blue-50",
    },
    {
      label: t.pendingRequests,
      value: "6",
      icon: FileText,
      color: "text-orange-600",
      trend: "-2",
      bgColor: "bg-orange-50",
    },
    {
      label: t.activeContracts,
      value: "12",
      icon: DollarSign,
      color: "text-purple-600",
      trend: "+1",
      bgColor: "bg-purple-50",
    },
  ]

  const navigationItems = [
    { id: "overview", label: t.overview, icon: Home },
    { id: "farmer-registration", label: t.farmerReg, icon: UserPlus },
    { id: "crop-verification", label: t.cropVerify, icon: CheckCircle },
    { id: "quality-control", label: t.qualityControl, icon: Upload },
    { id: "escrow-monitor", label: t.escrowMonitor, icon: DollarSign },
    { id: "blockchain-log", label: t.blockchainLog, icon: Database },
    { id: "notifications", label: t.notifications, icon: Bell },
  ]

  const quickActions = [
    { label: t.farmerReg, icon: UserPlus, action: () => setActiveTab("farmer-registration"), color: "bg-green-500" },
    { label: t.cropVerify, icon: CheckCircle, action: () => setActiveTab("crop-verification"), color: "bg-blue-500" },
    { label: t.qualityControl, icon: Upload, action: () => setActiveTab("quality-control"), color: "bg-orange-500" },
    { label: t.escrowMonitor, icon: DollarSign, action: () => setActiveTab("escrow-monitor"), color: "bg-purple-500" },
  ]

  const recentActivities = [
    { action: "Farmer Rajesh Kumar registered", time: "2 minutes ago", type: "registration" },
    { action: "Crop verification completed for Plot #A123", time: "15 minutes ago", type: "verification" },
    { action: "Quality check passed for Batch #B456", time: "1 hour ago", type: "quality" },
    { action: "Payment released for Contract #C789", time: "2 hours ago", type: "payment" },
  ]

  const quickNotifications = [
    { id: 1, message: "Ramesh Kumar needs assistance", time: "2 min ago", priority: "high" },
    { id: 2, message: "AI scan failed for Sunita Devi", time: "15 min ago", priority: "medium" },
    { id: 3, message: "New farmer registration pending", time: "1 hour ago", priority: "low" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.todayStats}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                          <div className="flex items-center gap-3">
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <Badge variant="secondary" className="text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {stat.trend}
                            </Badge>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    className={`${action.color} hover:opacity-90 text-white h-20 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200`}
                  >
                    <action.icon className="h-6 w-6" />
                    <span className="text-sm font-medium text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.recentActivity}</h3>
              <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          </div>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "farmer-registration":
        return <FarmerRegistration language={language} />
      case "crop-verification":
        return <CropVerification language={language} />
      case "quality-control":
        return <QualityControl language={language} />
      case "escrow-monitor":
        return <EscrowMonitor language={language} />
      case "blockchain-log":
        return <BlockchainLog language={language} />
      case "notifications":
        return <NotificationPanel language={language} />
      default:
        return <div>Content not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{t.title}</h1>
              <p className="text-xs text-gray-500">{t.subtitle}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-11 ${
                  activeTab === item.id
                    ? "bg-green-600 text-white shadow-md hover:bg-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-gray-700 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
              <span className="font-medium">{t.settings}</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-gray-700 hover:bg-gray-100">
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">{t.help}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {t.welcome}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playAudio(t.welcome)}
                      className="p-1 h-auto hover:bg-gray-100"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </h2>
                  <p className="text-sm text-gray-500">
                    {t.lastSync}: {currentTime.toLocaleTimeString(language === "en" ? "en-US" : "or-IN")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{t.systemStatus}</span>
                </div>

                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="relative p-2 hover:bg-gray-100"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Button>

                  {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{t.notifications}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveTab("notifications")}
                            className="text-green-600 hover:text-green-700"
                          >
                            View All
                          </Button>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {quickNotifications.map((notification) => (
                          <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.priority === "high"
                                    ? "bg-red-500"
                                    : notification.priority === "medium"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "od" : "en")}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  {language === "en" ? "ଓଡ଼ିଆ" : "English"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-gray-300 hover:bg-gray-50 text-gray-700 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {notificationOpen && <div className="fixed inset-0 z-30" onClick={() => setNotificationOpen(false)} />}
    </div>
  )
}
