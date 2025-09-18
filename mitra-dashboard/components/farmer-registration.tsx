"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Volume2, UserPlus, Upload, QrCode, MapPin, FileText, CheckCircle, Clock } from "lucide-react"

interface FarmerRegistrationProps {
  language: "en" | "od"
}

const translations = {
  en: {
    title: "Farmer Registration",
    subtitle: "Register new farmers or re-verify existing ones",
    farmerName: "Farmer Name",
    phoneNumber: "Phone Number",
    aadhaarId: "Aadhaar/ID Proof",
    landLocation: "Land Location",
    cropType: "Crop Type",
    landSize: "Land Size (Acres)",
    uploadDoc: "Upload Document",
    generateQr: "Generate QR Code",
    register: "Register Farmer",
    recentRegistrations: "Recent Registrations",
    status: "Status",
    verified: "Verified",
    pending: "Pending",
    rejected: "Rejected",
    selectCrop: "Select crop type",
    enterLocation: "Enter land coordinates or address",
  },
  od: {
    title: "କୃଷକ ପଞ୍ଜୀକରଣ",
    subtitle: "ନୂତନ କୃଷକ ପଞ୍ଜୀକରଣ କିମ୍ବା ପୁନଃ ଯାଞ୍ଚ",
    farmerName: "କୃଷକଙ୍କ ନାମ",
    phoneNumber: "ଫୋନ୍ ନମ୍ବର",
    aadhaarId: "ଆଧାର/ପରିଚୟ ପ୍ରମାଣ",
    landLocation: "ଜମି ଅବସ୍ଥାନ",
    cropType: "ଫସଲ ପ୍ରକାର",
    landSize: "ଜମି ଆକାର (ଏକର)",
    uploadDoc: "ଡକୁମେଣ୍ଟ ଅପଲୋଡ୍",
    generateQr: "QR କୋଡ୍ ତିଆରି",
    register: "କୃଷକ ପଞ୍ଜୀକରଣ",
    recentRegistrations: "ସାମ୍ପ୍ରତିକ ପଞ୍ଜୀକରଣ",
    status: "ସ୍ଥିତି",
    verified: "ଯାଞ୍ଚିତ",
    pending: "ବିଚାରାଧୀନ",
    rejected: "ପ୍ରତ୍ୟାଖ୍ୟାତ",
    selectCrop: "ଫସଲ ପ୍ରକାର ବାଛନ୍ତୁ",
    enterLocation: "ଜମିର ସ୍ଥାନାଙ୍କ କିମ୍ବା ଠିକଣା ଲେଖନ୍ତୁ",
  },
}

const cropTypes = [
  "Rice",
  "Wheat",
  "Maize",
  "Sugarcane",
  "Cotton",
  "Soybean",
  "Groundnut",
  "Turmeric",
  "Chili",
  "Onion",
]

const recentFarmers = [
  { id: 1, name: "Ramesh Kumar", phone: "+91 9876543210", crop: "Rice", status: "verified", date: "2024-01-15" },
  { id: 2, name: "Sunita Devi", phone: "+91 9876543211", crop: "Wheat", status: "pending", date: "2024-01-14" },
  { id: 3, name: "Prakash Singh", phone: "+91 9876543212", crop: "Maize", status: "verified", date: "2024-01-13" },
  { id: 4, name: "Meera Patel", phone: "+91 9876543213", crop: "Cotton", status: "pending", date: "2024-01-12" },
]

export default function FarmerRegistration({ language }: FarmerRegistrationProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    location: "",
    cropType: "",
    landSize: "",
  })
  const [uploadedDoc, setUploadedDoc] = useState<File | null>(null)
  const t = translations[language]

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-US" : "or-IN"
      speechSynthesis.speak(utterance)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle farmer registration
    playAudio(language === "en" ? "Farmer registered successfully" : "କୃଷକ ସଫଳତାର ସହିତ ପଞ୍ଜୀକୃତ")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedDoc(file)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      verified: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      rejected: { color: "bg-red-100 text-red-800", icon: FileText },
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

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <UserPlus className="h-5 w-5" />
            {t.title}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.title)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  {t.farmerName}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(t.farmerName)}
                    className="p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  {t.phoneNumber}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(t.phoneNumber)}
                    className="p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="flex items-center gap-2">
                  {t.aadhaarId}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(t.aadhaarId)}
                    className="p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </Label>
                <Input
                  id="aadhaar"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="landSize" className="flex items-center gap-2">
                  {t.landSize}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(t.landSize)}
                    className="p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </Label>
                <Input
                  id="landSize"
                  type="number"
                  step="0.1"
                  value={formData.landSize}
                  onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                  className="border-green-200 focus:border-green-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t.landLocation}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => playAudio(t.landLocation)}
                  className="p-1 h-auto"
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              </Label>
              <Textarea
                id="location"
                placeholder={t.enterLocation}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="border-green-200 focus:border-green-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                {t.cropType}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => playAudio(t.cropType)}
                  className="p-1 h-auto"
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              </Label>
              <Select
                value={formData.cropType}
                onValueChange={(value) => setFormData({ ...formData, cropType: value })}
              >
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder={t.selectCrop} />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="document" className="flex items-center gap-2 mb-2">
                  <Upload className="h-4 w-4" />
                  {t.uploadDoc}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(t.uploadDoc)}
                    className="p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </Label>
                <Input
                  id="document"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="border-green-200 focus:border-green-400"
                />
                {uploadedDoc && <p className="text-sm text-green-600 mt-1">Uploaded: {uploadedDoc.name}</p>}
              </div>

              <Button
                type="button"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <QrCode className="h-4 w-4 mr-2" />
                {t.generateQr}
              </Button>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              {t.register}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Registrations */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t.recentRegistrations}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.recentRegistrations)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {recentFarmers.map((farmer) => (
              <div
                key={farmer.id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">{farmer.name}</h4>
                  <p className="text-sm text-green-600">{farmer.phone}</p>
                  <p className="text-sm text-green-600">Crop: {farmer.crop}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(farmer.status)}
                  <p className="text-xs text-green-500 mt-1">{farmer.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
