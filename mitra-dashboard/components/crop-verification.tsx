"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, CheckCircle, X, Camera, Upload, MapPin, User, Wheat, Scale, Clock, AlertCircle } from "lucide-react"

interface CropVerificationProps {
  language: "en" | "od"
}

const translations = {
  en: {
    title: "Crop Verification Requests",
    subtitle: "Review and verify farmer crop submissions",
    pendingRequests: "Pending Verification Requests",
    farmerName: "Farmer Name",
    cropType: "Crop Type",
    quantity: "Quantity",
    location: "Location",
    visitVerify: "Visit & Verify",
    aiScan: "AI Scan Tool",
    uploadImage: "Upload Image",
    capturePhoto: "Capture Photo",
    gradingNotes: "Grading Notes",
    verifyApprove: "Verify & Approve",
    reject: "Reject",
    status: "Status",
    pending: "Pending",
    verified: "Verified",
    rejected: "Rejected",
    inProgress: "In Progress",
    requestDate: "Request Date",
    grade: "Grade",
    notes: "Notes",
    selectGrade: "Select grade",
    enterNotes: "Enter verification notes",
    recentVerifications: "Recent Verifications",
  },
  od: {
    title: "ଫସଲ ଯାଞ୍ଚ ଅନୁରୋଧ",
    subtitle: "କୃଷକଙ୍କ ଫସଲ ଦାଖଲ ସମୀକ୍ଷା ଏବଂ ଯାଞ୍ଚ",
    pendingRequests: "ବିଚାରାଧୀନ ଯାଞ୍ଚ ଅନୁରୋଧ",
    farmerName: "କୃଷକଙ୍କ ନାମ",
    cropType: "ଫସଲ ପ୍ରକାର",
    quantity: "ପରିମାଣ",
    location: "ଅବସ୍ଥାନ",
    visitVerify: "ପରିଦର୍ଶନ ଏବଂ ଯାଞ୍ଚ",
    aiScan: "AI ସ୍କାନ ଉପକରଣ",
    uploadImage: "ଛବି ଅପଲୋଡ୍",
    capturePhoto: "ଫଟୋ ଉଠାନ୍ତୁ",
    gradingNotes: "ଗ୍ରେଡିଂ ନୋଟ୍ସ",
    verifyApprove: "ଯାଞ୍ଚ ଏବଂ ଅନୁମୋଦନ",
    reject: "ପ୍ରତ୍ୟାଖ୍ୟାନ",
    status: "ସ୍ଥିତି",
    pending: "ବିଚାରାଧୀନ",
    verified: "ଯାଞ୍ଚିତ",
    rejected: "ପ୍ରତ୍ୟାଖ୍ୟାତ",
    inProgress: "ଚାଲିଛି",
    requestDate: "ଅନୁରୋଧ ତାରିଖ",
    grade: "ଗ୍ରେଡ୍",
    notes: "ନୋଟ୍ସ",
    selectGrade: "ଗ୍ରେଡ୍ ବାଛନ୍ତୁ",
    enterNotes: "ଯାଞ୍ଚ ନୋଟ୍ସ ଲେଖନ୍ତୁ",
    recentVerifications: "ସାମ୍ପ୍ରତିକ ଯାଞ୍ଚ",
  },
}

const pendingRequests = [
  {
    id: 1,
    farmerName: "Ramesh Kumar",
    cropType: "Rice",
    quantity: "500 kg",
    location: "Village Puri, Plot 23A",
    requestDate: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    farmerName: "Sunita Devi",
    cropType: "Wheat",
    quantity: "300 kg",
    location: "Village Cuttack, Plot 15B",
    requestDate: "2024-01-14",
    status: "in-progress",
  },
  {
    id: 3,
    farmerName: "Prakash Singh",
    cropType: "Maize",
    quantity: "400 kg",
    location: "Village Bhubaneswar, Plot 8C",
    requestDate: "2024-01-13",
    status: "pending",
  },
]

const recentVerifications = [
  {
    id: 1,
    farmerName: "Meera Patel",
    cropType: "Cotton",
    quantity: "200 kg",
    status: "verified",
    grade: "A",
    date: "2024-01-12",
    notes: "High quality cotton, good fiber length",
  },
  {
    id: 2,
    farmerName: "Raj Kumar",
    cropType: "Turmeric",
    quantity: "150 kg",
    status: "rejected",
    grade: "C",
    date: "2024-01-11",
    notes: "Quality below standards, moisture content high",
  },
]

const grades = ["A+", "A", "B+", "B", "C", "D"]

export default function CropVerification({ language }: CropVerificationProps) {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [verificationData, setVerificationData] = useState({
    grade: "",
    notes: "",
    images: [] as File[],
  })
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
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      "in-progress": { color: "bg-blue-100 text-blue-800", icon: AlertCircle },
      verified: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800", icon: X },
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setVerificationData({ ...verificationData, images: [...verificationData.images, ...files] })
  }

  const handleVerify = (approve: boolean) => {
    const action = approve ? "approved" : "rejected"
    playAudio(
      language === "en"
        ? `Crop verification ${action} successfully`
        : `ଫସଲ ଯାଞ୍ଚ ସଫଳତାର ସହିତ ${approve ? "ଅନୁମୋଦିତ" : "ପ୍ରତ୍ୟାଖ୍ୟାତ"}`,
    )
    setSelectedRequest(null)
    setVerificationData({ grade: "", notes: "", images: [] })
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            {t.title}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.title)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
              {t.pendingRequests}
              <Button variant="ghost" size="sm" onClick={() => playAudio(t.pendingRequests)} className="p-1 h-auto">
                <Volume2 className="h-4 w-4" />
              </Button>
            </h3>

            {pendingRequests.map((request) => (
              <div key={request.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.farmerName}</p>
                        <p className="font-semibold text-green-800">{request.farmerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wheat className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.cropType}</p>
                        <p className="font-semibold text-green-800">{request.cropType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.quantity}</p>
                        <p className="font-semibold text-green-800">{request.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">{t.location}</p>
                        <p className="font-semibold text-green-800 text-balance">{request.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(request.status)}
                    <p className="text-xs text-green-500">{request.requestDate}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedRequest(request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={selectedRequest === request.id}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t.visitVerify}
                  </Button>
                </div>

                {selectedRequest === request.id && (
                  <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                      {t.aiScan}
                      <Button variant="ghost" size="sm" onClick={() => playAudio(t.aiScan)} className="p-1 h-auto">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </h4>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Label htmlFor="image-upload" className="flex items-center gap-2 mb-2">
                            <Upload className="h-4 w-4" />
                            {t.uploadImage}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => playAudio(t.uploadImage)}
                              className="p-1 h-auto"
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          </Label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="border-green-200 focus:border-green-400"
                          />
                        </div>

                        <Button
                          variant="outline"
                          className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          {t.capturePhoto}
                        </Button>
                      </div>

                      {verificationData.images.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {verificationData.images.map((file, index) => (
                            <div key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {file.name}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            {t.grade}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => playAudio(t.grade)}
                              className="p-1 h-auto"
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          </Label>
                          <Select
                            value={verificationData.grade}
                            onValueChange={(value) => setVerificationData({ ...verificationData, grade: value })}
                          >
                            <SelectTrigger className="border-green-200 focus:border-green-400">
                              <SelectValue placeholder={t.selectGrade} />
                            </SelectTrigger>
                            <SelectContent>
                              {grades.map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  Grade {grade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            {t.gradingNotes}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => playAudio(t.gradingNotes)}
                              className="p-1 h-auto"
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          </Label>
                          <Textarea
                            placeholder={t.enterNotes}
                            value={verificationData.notes}
                            onChange={(e) => setVerificationData({ ...verificationData, notes: e.target.value })}
                            className="border-green-200 focus:border-green-400"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleVerify(true)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={!verificationData.grade || !verificationData.notes}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t.verifyApprove}
                        </Button>

                        <Button
                          onClick={() => handleVerify(false)}
                          variant="destructive"
                          disabled={!verificationData.notes}
                        >
                          <X className="h-4 w-4 mr-2" />
                          {t.reject}
                        </Button>

                        <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Verifications */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {t.recentVerifications}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.recentVerifications)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {recentVerifications.map((verification) => (
              <div
                key={verification.id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-semibold text-green-800">{verification.farmerName}</h4>
                    {getStatusBadge(verification.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-green-600">
                    <p>
                      <span className="font-medium">{t.cropType}:</span> {verification.cropType}
                    </p>
                    <p>
                      <span className="font-medium">{t.quantity}:</span> {verification.quantity}
                    </p>
                    <p>
                      <span className="font-medium">{t.grade}:</span> {verification.grade}
                    </p>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    <span className="font-medium">{t.notes}:</span> {verification.notes}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-500">{verification.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
