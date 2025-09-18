"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CreditCard, Building, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface KYCFormProps {
  language: "en" | "od"
  onSuccess?: () => void
}

export function KYCForm({ language, onSuccess }: KYCFormProps) {
  const [formData, setFormData] = useState({
    gstNumber: "",
    panNumber: "",
    companyId: "",
    bankAccount: "",
    ifscCode: "",
  })
  const [uploadedDocs, setUploadedDocs] = useState({
    gst: false,
    pan: false,
    company: false,
    bank: false,
  })
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected">("pending")
  const [isLoading, setIsLoading] = useState(false)

  const text = {
    en: {
      title: "KYC Verification",
      subtitle: "Complete your verification to start trading",
      gstNumber: "GST Number",
      panNumber: "PAN Number",
      companyId: "Company Registration ID",
      bankAccount: "Bank Account Number",
      ifscCode: "IFSC Code",
      uploadDocs: "Upload Documents",
      gstCert: "GST Certificate",
      panCard: "PAN Card",
      companyReg: "Company Registration",
      bankProof: "Bank Account Proof",
      submit: "Submit for Verification",
      status: {
        pending: "Verification Pending",
        verified: "Verified Buyer",
        rejected: "Verification Rejected",
      },
      continue: "Continue to Marketplace",
      placeholder: {
        gst: "Enter GST number",
        pan: "Enter PAN number",
        company: "Enter company registration ID",
        bank: "Enter bank account number",
        ifsc: "Enter IFSC code",
      },
    },
    od: {
      title: "KYC ଯାଞ୍ଚ",
      subtitle: "ବାଣିଜ୍ୟ ଆରମ୍ଭ କରିବା ପାଇଁ ଆପଣଙ୍କ ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ",
      gstNumber: "GST ନମ୍ବର",
      panNumber: "PAN ନମ୍ବର",
      companyId: "କମ୍ପାନୀ ପଞ୍ଜୀକରଣ ID",
      bankAccount: "ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ନମ୍ବର",
      ifscCode: "IFSC କୋଡ୍",
      uploadDocs: "ଡକୁମେଣ୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ",
      gstCert: "GST ସାର୍ଟିଫିକେଟ୍",
      panCard: "PAN କାର୍ଡ",
      companyReg: "କମ୍ପାନୀ ପଞ୍ଜୀକରଣ",
      bankProof: "ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ପ୍ରମାଣ",
      submit: "ଯାଞ୍ଚ ପାଇଁ ଦାଖଲ କରନ୍ତୁ",
      status: {
        pending: "ଯାଞ୍ଚ ବିଚାରାଧୀନ",
        verified: "ଯାଞ୍ଚିତ କ୍ରେତା",
        rejected: "ଯାଞ୍ଚ ପ୍ରତ୍ୟାଖ୍ୟାନ",
      },
      continue: "ବଜାରକୁ ଯାଆନ୍ତୁ",
      placeholder: {
        gst: "GST ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
        pan: "PAN ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
        company: "କମ୍ପାନୀ ପଞ୍ଜୀକରଣ ID ପ୍ରବେଶ କରନ୍ତୁ",
        bank: "ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
        ifsc: "IFSC କୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ",
      },
    },
  }

  const t = text[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate verification success
    setVerificationStatus("verified")
    setIsLoading(false)
  }

  const handleFileUpload = (docType: keyof typeof uploadedDocs) => {
    setUploadedDocs({ ...uploadedDocs, [docType]: true })
  }

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = () => {
    switch (verificationStatus) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  if (verificationStatus === "verified") {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-800">{t.status.verified}</h3>
            <p className="text-muted-foreground">Your account has been successfully verified</p>
          </div>
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-2">{t.status.verified}</span>
          </Badge>
        </div>
        <Button onClick={() => onSuccess?.()} className="w-full">
          {t.continue}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className={getStatusColor()}>
          {getStatusIcon()}
          <span className="ml-2">{t.status[verificationStatus]}</span>
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gst" className="text-sm font-medium">
                {t.gstNumber}
              </Label>
              <Input
                id="gst"
                placeholder={t.placeholder.gst}
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan" className="text-sm font-medium">
                {t.panNumber}
              </Label>
              <Input
                id="pan"
                placeholder={t.placeholder.pan}
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              {t.companyId}
            </Label>
            <Input
              id="company"
              placeholder={t.placeholder.company}
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank" className="text-sm font-medium">
                {t.bankAccount}
              </Label>
              <Input
                id="bank"
                placeholder={t.placeholder.bank}
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifsc" className="text-sm font-medium">
                {t.ifscCode}
              </Label>
              <Input
                id="ifsc"
                placeholder={t.placeholder.ifsc}
                value={formData.ifscCode}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.uploadDocs}</CardTitle>
            <CardDescription>Upload required business documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "gst", label: t.gstCert, icon: FileText },
              { key: "pan", label: t.panCard, icon: CreditCard },
              { key: "company", label: t.companyReg, icon: Building },
              { key: "bank", label: t.bankProof, icon: CreditCard },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                {uploadedDocs[key as keyof typeof uploadedDocs] ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Uploaded
                  </Badge>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload(key as keyof typeof uploadedDocs)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : t.submit}
        </Button>
      </form>
    </div>
  )
}
