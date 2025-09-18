"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { KYCForm } from "@/components/auth/kyc-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Leaf,
  Shield,
  Globe,
  Search,
  MapPin,
  Clock,
  TrendingUp,
  Bell,
  Wallet,
  Gavel,
  Eye,
  CheckCircle,
  AlertCircle,
  Grid,
  List,
  DollarSign,
  Package,
  Truck,
} from "lucide-react"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"login" | "signup" | "kyc" | "marketplace">("login")
  const [language, setLanguage] = useState<"en" | "od">("en")
  const [marketplaceTab, setMarketplaceTab] = useState("marketplace")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [selectedLot, setSelectedLot] = useState<any>(null)

  const cropLots = [
    {
      id: "BT001",
      crop: "Basmati Rice",
      variety: "Pusa Basmati 1121",
      quantity: "50 MT",
      grade: "A+",
      price: "₹45,000/MT",
      location: "Cuttack, Odisha",
      farmer: "Verified Farmer #1247",
      timeLeft: "2h 45m",
      bids: 12,
      image: "/basmati-rice-field.jpg",
      urgent: true,
      exportReady: true,
      currentBid: 45000,
      minBid: 44000,
      provenance: [
        { stage: "Planting", date: "Jan 2024", status: "completed" },
        { stage: "Growing", date: "Feb-May 2024", status: "completed" },
        { stage: "Harvesting", date: "Jun 2024", status: "completed" },
        { stage: "Processing", date: "Jul 2024", status: "completed" },
        { stage: "Quality Check", date: "Aug 2024", status: "completed" },
      ],
    },
    {
      id: "TM002",
      crop: "Turmeric",
      variety: "Lakadong",
      quantity: "25 MT",
      grade: "Premium",
      price: "₹18,500/MT",
      location: "Kandhamal, Odisha",
      farmer: "Verified Farmer #2156",
      timeLeft: "1d 12h",
      bids: 8,
      image: "/turmeric-powder.png",
      urgent: false,
      exportReady: true,
      currentBid: 18500,
      minBid: 18000,
      provenance: [
        { stage: "Planting", date: "Mar 2024", status: "completed" },
        { stage: "Growing", date: "Apr-Sep 2024", status: "completed" },
        { stage: "Harvesting", date: "Oct 2024", status: "completed" },
        { stage: "Drying", date: "Nov 2024", status: "completed" },
        { stage: "Quality Check", date: "Dec 2024", status: "completed" },
      ],
    },
    {
      id: "CT003",
      crop: "Cotton",
      variety: "Bt Cotton",
      quantity: "100 MT",
      grade: "A",
      price: "₹6,200/MT",
      location: "Bargarh, Odisha",
      farmer: "Verified Farmer #3421",
      timeLeft: "3h 20m",
      bids: 15,
      image: "/cotton-field.png",
      urgent: true,
      exportReady: false,
      currentBid: 6200,
      minBid: 6000,
      provenance: [
        { stage: "Planting", date: "Jun 2024", status: "completed" },
        { stage: "Growing", date: "Jul-Nov 2024", status: "completed" },
        { stage: "Harvesting", date: "Dec 2024", status: "completed" },
        { stage: "Ginning", date: "Jan 2025", status: "completed" },
        { stage: "Quality Check", date: "Jan 2025", status: "completed" },
      ],
    },
    {
      id: "WH004",
      crop: "Wheat",
      variety: "HD-2967",
      quantity: "75 MT",
      grade: "A+",
      price: "₹22,800/MT",
      location: "Sundargarh, Odisha",
      farmer: "Verified Farmer #4532",
      timeLeft: "5h 15m",
      bids: 6,
      image: "/wheat-grains.jpg",
      urgent: false,
      exportReady: true,
      currentBid: 22800,
      minBid: 22500,
      provenance: [
        { stage: "Planting", date: "Nov 2023", status: "completed" },
        { stage: "Growing", date: "Dec 2023-Mar 2024", status: "completed" },
        { stage: "Harvesting", date: "Apr 2024", status: "completed" },
        { stage: "Storage", date: "May 2024", status: "completed" },
        { stage: "Quality Check", date: "Jun 2024", status: "completed" },
      ],
    },
  ]

  const filteredLots = cropLots.filter((lot) => {
    const matchesSearch =
      lot.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCrop = selectedCrop === "all" || lot.crop.toLowerCase().includes(selectedCrop.toLowerCase())
    const matchesGrade = selectedGrade === "all" || lot.grade === selectedGrade
    const matchesDistrict = selectedDistrict === "all" || lot.location.includes(selectedDistrict)

    return matchesSearch && matchesCrop && matchesGrade && matchesDistrict
  })

  const text = {
    en: {
      title: "Origo Buyer Portal",
      subtitle: "Blockchain-backed agricultural marketplace",
      tagline: "Connect with verified farmers. Secure transactions. Transparent supply chain.",
      features: {
        secure: "Secure Escrow",
        verified: "Verified Farmers",
        global: "Global Reach",
      },
      login: "Login",
      signup: "Sign Up",
      switchToSignup: "Don't have an account? Sign up",
      switchToLogin: "Already have an account? Login",
      marketplace: "Marketplace",
      myBids: "My Bids",
      wallet: "Wallet",
      notifications: "Notifications",
      search: "Search crops, varieties, batch IDs...",
      filters: "Filters",
      urgent: "Urgent",
      exportReady: "Export Ready",
      placeBid: "Place Bid",
      viewDetails: "View Details",
      bidsCount: "bids",
      timeLeft: "Time Left",
    },
    od: {
      title: "ଓରିଗୋ କ୍ରେତା ପୋର୍ଟାଲ",
      subtitle: "ବ୍ଲକଚେନ୍-ସମର୍ଥିତ କୃଷି ବଜାର",
      tagline: "ଯାଞ୍ଚିତ କୃଷକମାନଙ୍କ ସହିତ ସଂଯୋଗ କରନ୍ତୁ। ସୁରକ୍ଷିତ କାରବାର। ସ୍ୱଚ୍ଛ ଯୋଗାଣ ଶୃଙ୍ଖଳା।",
      features: {
        secure: "ସୁରକ୍ଷିତ ଏସ୍କ୍ରୋ",
        verified: "ଯାଞ୍ଚିତ କୃଷକ",
        global: "ବିଶ୍ୱବ୍ୟାପୀ ପହଞ୍ଚ",
      },
      login: "ଲଗଇନ୍",
      signup: "ସାଇନ୍ ଅପ୍",
      switchToSignup: "ଆକାଉଣ୍ଟ ନାହିଁ? ସାଇନ୍ ଅପ୍ କରନ୍ତୁ",
      switchToLogin: "ପୂର୍ବରୁ ଆକାଉଣ୍ଟ ଅଛି? ଲଗଇନ୍ କରନ୍ତୁ",
      marketplace: "ବଜାର",
      myBids: "ମୋର ବିଡ୍",
      wallet: "ୱାଲେଟ୍",
      notifications: "ବିଜ୍ଞପ୍ତି",
      search: "ଫସଲ, କିସମ, ବ୍ୟାଚ୍ ID ଖୋଜନ୍ତୁ...",
      filters: "ଫିଲ୍ଟର",
      urgent: "ଜରୁରୀ",
      exportReady: "ରପ୍ତାନି ପ୍ରସ୍ତୁତ",
      placeBid: "ବିଡ୍ ଦିଅନ୍ତୁ",
      viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
      bidsCount: "ବିଡ୍",
      timeLeft: "ବାକି ସମୟ",
    },
  }

  const t = text[language]

  const renderMarketplace = () => (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t.title}</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Buyer
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "od" : "en")}>
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "ଓଡ଼ିଆ" : "English"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={marketplaceTab} onValueChange={setMarketplaceTab} className="w-full">
        <div className="border-b bg-card">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger value="marketplace" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>{t.marketplace}</span>
              </TabsTrigger>
              <TabsTrigger value="mybids" className="flex items-center space-x-2">
                <Gavel className="w-4 h-4" />
                <span>{t.myBids}</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>{t.wallet}</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>{t.notifications}</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Crop Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="turmeric">Turmeric</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="Cuttack">Cuttack</SelectItem>
                    <SelectItem value="Kandhamal">Kandhamal</SelectItem>
                    <SelectItem value="Bargarh">Bargarh</SelectItem>
                    <SelectItem value="Sundargarh">Sundargarh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Crop Lots Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredLots.map((lot) => (
                <Card key={lot.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={lot.image || "/placeholder.svg"} alt={lot.crop} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 flex gap-2">
                      {lot.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {t.urgent}
                        </Badge>
                      )}
                      {lot.exportReady && (
                        <Badge variant="secondary" className="text-xs">
                          <Truck className="w-3 h-3 mr-1" />
                          {t.exportReady}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-background/80 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {lot.timeLeft}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{lot.crop}</h3>
                        <p className="text-sm text-muted-foreground">{lot.variety}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Quantity</p>
                          <p className="font-medium">{lot.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Current Price</p>
                          <p className="font-bold text-primary">{lot.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{lot.location}</span>
                        </div>
                        <Badge variant="outline">{lot.grade}</Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{lot.farmer}</span>
                        <div className="flex items-center space-x-1">
                          <Gavel className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {lot.bids} {t.bidsCount}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                              onClick={() => setSelectedLot(lot)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {t.viewDetails}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                {lot.crop} - {lot.variety}
                              </DialogTitle>
                              <DialogDescription>Batch ID: {lot.id}</DialogDescription>
                            </DialogHeader>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <img
                                  src={lot.image || "/placeholder.svg"}
                                  alt={lot.crop}
                                  className="w-full h-64 object-cover rounded-lg"
                                />

                                <div className="space-y-3">
                                  <h4 className="font-semibold">Lot Details</h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Quantity</p>
                                      <p className="font-medium">{lot.quantity}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Grade</p>
                                      <p className="font-medium">{lot.grade}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Location</p>
                                      <p className="font-medium">{lot.location}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Farmer</p>
                                      <p className="font-medium">{lot.farmer}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-semibold">Provenance Timeline</h4>
                                  <div className="space-y-2">
                                    {lot.provenance.map((stage, index) => (
                                      <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <div className="flex-1">
                                          <p className="text-sm font-medium">{stage.stage}</p>
                                          <p className="text-xs text-muted-foreground">{stage.date}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Place Your Bid</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                      <span>Current Highest Bid:</span>
                                      <span className="font-bold text-primary">
                                        ₹{lot.currentBid.toLocaleString()}/MT
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Minimum Bid:</span>
                                      <span>₹{lot.minBid.toLocaleString()}/MT</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Time Remaining:</span>
                                      <span className="font-medium text-orange-600">{lot.timeLeft}</span>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Your Bid (₹/MT)</label>
                                      <Input type="number" placeholder={`Min: ${lot.minBid}`} min={lot.minBid} />
                                    </div>

                                    <Button className="w-full">
                                      <Gavel className="w-4 h-4 mr-2" />
                                      {t.placeBid}
                                    </Button>

                                    <p className="text-xs text-muted-foreground">
                                      * Escrow will be activated upon winning bid
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Bidding Activity</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span>Buyer #1247</span>
                                        <span>₹{lot.currentBid.toLocaleString()}/MT</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Buyer #3421</span>
                                        <span>₹{(lot.currentBid - 500).toLocaleString()}/MT</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Buyer #5632</span>
                                        <span>₹{(lot.currentBid - 1000).toLocaleString()}/MT</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button size="sm" className="flex-1">
                          <Gavel className="w-4 h-4 mr-2" />
                          {t.placeBid}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mybids" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Bids</CardTitle>
                  <CardDescription>Your current bidding activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src="/basmati-rice-field.jpg"
                          alt="Basmati Rice"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold">Basmati Rice - Pusa 1121</h4>
                          <p className="text-sm text-muted-foreground">Batch: BT001 • 50 MT</p>
                          <Badge variant="secondary">Leading Bid</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹45,000/MT</p>
                        <p className="text-sm text-muted-foreground">2h 45m left</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src="/turmeric-powder.png" alt="Turmeric" className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h4 className="font-semibold">Turmeric - Lakadong</h4>
                          <p className="text-sm text-muted-foreground">Batch: TM002 • 25 MT</p>
                          <Badge variant="outline">Outbid</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹18,000/MT</p>
                        <p className="text-sm text-muted-foreground">1d 12h left</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Won Auctions</CardTitle>
                  <CardDescription>Auctions you've successfully won</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center space-x-4">
                        <img src="/wheat-grains.jpg" alt="Wheat" className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h4 className="font-semibold">Wheat - HD-2967</h4>
                          <p className="text-sm text-muted-foreground">Batch: WH003 • 75 MT</p>
                          <Badge variant="default">Won</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹22,500/MT</p>
                        <p className="text-sm text-muted-foreground">Escrow Active</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <p className="text-2xl font-bold">₹2,45,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Escrow</p>
                      <p className="text-2xl font-bold">₹1,68,750</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">₹8,92,500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Payment Released</p>
                        <p className="text-sm text-muted-foreground">Wheat - HD-2967 (WH003)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">-₹1,68,750</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Escrow Deposit</p>
                        <p className="text-sm text-muted-foreground">Basmati Rice - Pusa 1121 (BT001)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">-₹2,25,000</p>
                      <p className="text-sm text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Wallet Top-up</p>
                        <p className="text-sm text-muted-foreground">Bank Transfer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">+₹5,00,000</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Auction Won!</h4>
                      <p className="text-sm text-muted-foreground">
                        Congratulations! You won the auction for Wheat - HD-2967 (WH003) at ₹22,500/MT
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Outbid Alert</h4>
                      <p className="text-sm text-muted-foreground">
                        You've been outbid on Turmeric - Lakadong (TM002). Current highest bid: ₹18,500/MT
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">45 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">New Lot Available</h4>
                      <p className="text-sm text-muted-foreground">
                        A new premium Basmati Rice lot is now available for bidding. Grade A+, 50 MT available.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">3 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Shipment Update</h4>
                      <p className="text-sm text-muted-foreground">
                        Your Cotton order (CT002) has been dispatched and is en route to your facility.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Escrow Released</h4>
                      <p className="text-sm text-muted-foreground">
                        Escrow for Wheat - HD-2967 (WH003) has been successfully released. Payment completed.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )

  if (currentView === "marketplace") {
    return renderMarketplace()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "od" : "en")}
          className="bg-card"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === "en" ? "ଓଡ଼ିଆ" : "English"}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Side - Branding */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
                  <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.tagline}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">{t.features.secure}</h3>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <Leaf className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">{t.features.verified}</h3>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">{t.features.global}</h3>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {currentView === "login" ? t.login : currentView === "signup" ? t.signup : "KYC Verification"}
                </CardTitle>
                {currentView !== "kyc" && (
                  <CardDescription>
                    {currentView === "login" ? "Welcome back to Origo" : "Join the Origo marketplace"}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {currentView === "login" && (
                  <>
                    <LoginForm onSuccess={() => setCurrentView("kyc")} language={language} />
                    <div className="text-center">
                      <Button
                        variant="link"
                        onClick={() => setCurrentView("signup")}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {t.switchToSignup}
                      </Button>
                    </div>
                  </>
                )}

                {currentView === "signup" && (
                  <>
                    <SignupForm onSuccess={() => setCurrentView("kyc")} language={language} />
                    <div className="text-center">
                      <Button
                        variant="link"
                        onClick={() => setCurrentView("login")}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {t.switchToLogin}
                      </Button>
                    </div>
                  </>
                )}

                {currentView === "kyc" && (
                  <KYCForm language={language} onSuccess={() => setCurrentView("marketplace")} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
