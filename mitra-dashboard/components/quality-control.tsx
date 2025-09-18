"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, Upload, FileText, Hash, CheckCircle, Clock, AlertTriangle, Database } from "lucide-react"

interface QualityControlProps {
  language: "en" | "od"
}

const translations = {
  en: {
    title: "Quality Control Upload",
    subtitle: "Upload lab reports, certificates, and AI grading output",
    uploadSection: "Upload Documents",
    documentType: "Document Type",
    farmerName: "Farmer Name",
    cropType: "Crop Type",
    uploadFile: "Upload File",
    description: "Description",
    generateHash: "Generate Blockchain Hash",
    submitToBlockchain: "Submit to Blockchain",
    recentUploads: "Recent QC Uploads",
    blockchainHash: "Blockchain Hash",
    status: "Status",
    uploaded: "Uploaded",
    processing: "Processing",
    verified: "Verified",
    failed: "Failed",
    labReport: "Lab Report",
    certificate: "Certificate",
    aiGrading: "AI Grading Output",
    qualityReport: "Quality Report",
    selectDocType: "Select document type",
    selectFarmer: "Select farmer",
    selectCrop: "Select crop type",
    enterDescription: "Enter document description",
    uploadDate: "Upload Date",
    viewDetails: "View Details",
    downloadReport: "Download Report",
  },
  od: {
    title: "ଗୁଣବତ୍ତା ନିୟନ୍ତ୍ରଣ ଅପଲୋଡ୍",
    subtitle: "ଲ୍ୟାବ ରିପୋର୍ଟ, ସାର୍ଟିଫିକେଟ୍ ଏବଂ AI ଗ୍ରେଡିଂ ଆଉଟପୁଟ୍ ଅପଲୋଡ୍",
    uploadSection: "ଡକୁମେଣ୍ଟ ଅପଲୋଡ୍",
    documentType: "ଡକୁମେଣ୍ଟ ପ୍ରକାର",
    farmerName: "କୃଷକଙ୍କ ନାମ",
    cropType: "ଫସଲ ପ୍ରକାର",
    uploadFile: "ଫାଇଲ ଅପଲୋଡ୍",
    description: "ବର୍ଣ୍ଣନା",
    generateHash: "ବ୍ଲକଚେନ୍ ହ୍ୟାସ୍ ତିଆରି",
    submitToBlockchain: "ବ୍ଲକଚେନରେ ଦାଖଲ",
    recentUploads: "ସାମ୍ପ୍ରତିକ QC ଅପଲୋଡ୍",
    blockchainHash: "ବ୍ଲକଚେନ୍ ହ୍ୟାସ୍",
    status: "ସ୍ଥିତି",
    uploaded: "ଅପଲୋଡ୍ ହୋଇଛି",
    processing: "ପ୍ରକ୍ରିୟାକରଣ",
    verified: "ଯାଞ୍ଚିତ",
    failed: "ବିଫଳ",
    labReport: "ଲ୍ୟାବ ରିପୋର୍ଟ",
    certificate: "ସାର୍ଟିଫିକେଟ୍",
    aiGrading: "AI ଗ୍ରେଡିଂ ଆଉଟପୁଟ୍",
    qualityReport: "ଗୁଣବତ୍ତା ରିପୋର୍ଟ",
    selectDocType: "ଡକୁମେଣ୍ଟ ପ୍ରକାର ବାଛନ୍ତୁ",
    selectFarmer: "କୃଷକ ବାଛନ୍ତୁ",
    selectCrop: "ଫସଲ ପ୍ରକାର ବାଛନ୍ତୁ",
    enterDescription: "ଡକୁମେଣ୍ଟ ବର୍ଣ୍ଣନା ଲେଖନ୍ତୁ",
    uploadDate: "ଅପଲୋଡ୍ ତାରିଖ",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    downloadReport: "ରିପୋର୍ଟ ଡାଉନଲୋଡ୍",
  },
}

const documentTypes = [
  { value: "lab-report", label: "Lab Report" },
  { value: "certificate", label: "Certificate" },
  { value: "ai-grading", label: "AI Grading Output" },
  { value: "quality-report", label: "Quality Report" },
]

const farmers = ["Ramesh Kumar", "Sunita Devi", "Prakash Singh", "Meera Patel", "Raj Kumar"]

const cropTypes = ["Rice", "Wheat", "Maize", "Cotton", "Turmeric"]

const recentUploads = [
  {
    id: 1,
    farmerName: "Ramesh Kumar",
    cropType: "Rice",
    documentType: "Lab Report",
    description: "Pesticide residue analysis report",
    status: "verified",
    uploadDate: "2024-01-15",
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
  },
  {
    id: 2,
    farmerName: "Sunita Devi",
    cropType: "Wheat",
    documentType: "AI Grading Output",
    description: "Automated quality grading results",
    status: "processing",
    uploadDate: "2024-01-14",
    blockchainHash: "0x9876543210fedcba0987654321abcdef",
  },
  {
    id: 3,
    farmerName: "Prakash Singh",
    cropType: "Maize",
    documentType: "Certificate",
    description: "Organic certification document",
    status: "uploaded",
    uploadDate: "2024-01-13",
    blockchainHash: "0xabcdef1234567890fedcba0987654321",
  },
]

export default function QualityControl({ language }: QualityControlProps) {
  const [formData, setFormData] = useState({
    documentType: "",
    farmerName: "",
    cropType: "",
    description: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [blockchainHash, setBlockchainHash] = useState("")
  const [isGeneratingHash, setIsGeneratingHash] = useState(false)
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
      uploaded: { color: "bg-blue-100 text-blue-800", icon: Upload },
      processing: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      verified: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      failed: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const generateBlockchainHash = () => {
    setIsGeneratingHash(true)
    // Simulate hash generation
    setTimeout(() => {
      const hash = "0x" + Math.random().toString(16).substr(2, 32)
      setBlockchainHash(hash)
      setIsGeneratingHash(false)
      playAudio(language === "en" ? "Blockchain hash generated" : "ବ୍ଲକଚେନ୍ ହ୍ୟାସ୍ ତିଆରି ହୋଇଛି")
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playAudio(
      language === "en" ? "Document submitted to blockchain successfully" : "ଡକୁମେଣ୍ଟ ସଫଳତାର ସହିତ ବ୍ଲକଚେନରେ ଦାଖଲ ହୋଇଛି",
    )
    // Reset form
    setFormData({ documentType: "", farmerName: "", cropType: "", description: "" })
    setUploadedFile(null)
    setBlockchainHash("")
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Upload className="h-5 w-5" />
            {t.title}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.title)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
              {t.uploadSection}
              <Button variant="ghost" size="sm" onClick={() => playAudio(t.uploadSection)} className="p-1 h-auto">
                <Volume2 className="h-4 w-4" />
              </Button>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  {t.documentType}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(t.documentType)}
                    className="p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </Label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value) => setFormData({ ...formData, documentType: value })}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue placeholder={t.selectDocType} />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
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
                <Select
                  value={formData.farmerName}
                  onValueChange={(value) => setFormData({ ...formData, farmerName: value })}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue placeholder={t.selectFarmer} />
                  </SelectTrigger>
                  <SelectContent>
                    {farmers.map((farmer) => (
                      <SelectItem key={farmer} value={farmer}>
                        {farmer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t.uploadFile}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => playAudio(t.uploadFile)}
                  className="p-1 h-auto"
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="border-green-200 focus:border-green-400"
              />
              {uploadedFile && <p className="text-sm text-green-600">Uploaded: {uploadedFile.name}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                {t.description}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => playAudio(t.description)}
                  className="p-1 h-auto"
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              </Label>
              <Textarea
                placeholder={t.enterDescription}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-green-200 focus:border-green-400"
              />
            </div>

            {/* Blockchain Hash Section */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-green-800 flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  {t.blockchainHash}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(t.blockchainHash)}
                    className="p-1 h-auto"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </h4>
                <Button
                  type="button"
                  onClick={generateBlockchainHash}
                  disabled={!uploadedFile || isGeneratingHash}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-100 bg-transparent"
                >
                  <Database className="h-4 w-4 mr-2" />
                  {isGeneratingHash ? "Generating..." : t.generateHash}
                </Button>
              </div>

              {blockchainHash && (
                <div className="p-3 bg-white rounded border border-green-200">
                  <p className="text-sm font-mono text-green-800 break-all">{blockchainHash}</p>
                </div>
              )}

              {blockchainHash && (
                <div className="mt-4 p-3 bg-white rounded border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-2">Blockchain Log Preview (JSON)</h5>
                  <pre className="text-xs text-green-700 overflow-x-auto">
                    {JSON.stringify(
                      {
                        transactionId: blockchainHash,
                        timestamp: new Date().toISOString(),
                        farmer: formData.farmerName,
                        crop: formData.cropType,
                        documentType: formData.documentType,
                        description: formData.description,
                        status: "pending_verification",
                        hash: blockchainHash,
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={!uploadedFile || !blockchainHash || !formData.documentType || !formData.farmerName}
            >
              <Database className="h-4 w-4 mr-2" />
              {t.submitToBlockchain}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Uploads */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t.recentUploads}
            <Button variant="ghost" size="sm" onClick={() => playAudio(t.recentUploads)} className="p-1 h-auto">
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-green-800">{upload.farmerName}</h4>
                      {getStatusBadge(upload.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-green-600">
                      <p>
                        <span className="font-medium">{t.cropType}:</span> {upload.cropType}
                      </p>
                      <p>
                        <span className="font-medium">{t.documentType}:</span> {upload.documentType}
                      </p>
                      <p>
                        <span className="font-medium">{t.uploadDate}:</span> {upload.uploadDate}
                      </p>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      <span className="font-medium">{t.description}:</span> {upload.description}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded border border-green-200 mb-3">
                  <p className="text-xs text-green-600 mb-1">{t.blockchainHash}:</p>
                  <p className="text-xs font-mono text-green-800 break-all">{upload.blockchainHash}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-100 bg-transparent"
                  >
                    {t.viewDetails}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-100 bg-transparent"
                  >
                    {t.downloadReport}
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
