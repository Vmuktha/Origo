"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Lock, Building, User, Phone } from "lucide-react"

interface SignupFormProps {
  onSuccess: () => void
  language: "en" | "od"
}

export function SignupForm({ onSuccess, language }: SignupFormProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    buyerType: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const text = {
    en: {
      businessName: "Business Name",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      buyerType: "Buyer Type",
      types: {
        wholesaler: "Wholesaler / Aggregator",
        retailer: "Retailer / Retail Chain",
        exporter: "Exporter / FMCG / Processor",
        trader: "Local Trader / Hotel / Co-op",
      },
      signup: "Create Account",
      placeholder: {
        businessName: "Enter your business name",
        email: "Enter your business email",
        phone: "Enter your phone number",
        password: "Create a password",
        confirmPassword: "Confirm your password",
      },
    },
    od: {
      businessName: "ବ୍ୟବସାୟ ନାମ",
      email: "ଇମେଲ୍ ଠିକଣା",
      phone: "ଫୋନ୍ ନମ୍ବର",
      password: "ପାସୱାର୍ଡ",
      confirmPassword: "ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ",
      buyerType: "କ୍ରେତା ପ୍ରକାର",
      types: {
        wholesaler: "ହୋଲସେଲର / ଏଗ୍ରିଗେଟର",
        retailer: "ରିଟେଲର / ରିଟେଲ ଚେନ୍",
        exporter: "ରପ୍ତାନିକାରୀ / FMCG / ପ୍ରୋସେସର",
        trader: "ସ୍ଥାନୀୟ ବ୍ୟବସାୟୀ / ହୋଟେଲ / କୋ-ଅପ୍",
      },
      signup: "ଆକାଉଣ୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ",
      placeholder: {
        businessName: "ଆପଣଙ୍କ ବ୍ୟବସାୟ ନାମ ପ୍ରବେଶ କରନ୍ତୁ",
        email: "ଆପଣଙ୍କ ବ୍ୟବସାୟିକ ଇମେଲ୍ ପ୍ରବେଶ କରନ୍ତୁ",
        phone: "ଆପଣଙ୍କ ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
        password: "ଏକ ପାସୱାର୍ଡ ସୃଷ୍ଟି କରନ୍ତୁ",
        confirmPassword: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ",
      },
    },
  }

  const t = text[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-sm font-medium">
          {t.businessName}
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="businessName"
            type="text"
            placeholder={t.placeholder.businessName}
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          {t.email}
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder={t.placeholder.email}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          {t.phone}
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder={t.placeholder.phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="buyerType" className="text-sm font-medium">
          {t.buyerType}
        </Label>
        <Select value={formData.buyerType} onValueChange={(value) => setFormData({ ...formData, buyerType: value })}>
          <SelectTrigger className="w-full">
            <User className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Select your business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wholesaler">{t.types.wholesaler}</SelectItem>
            <SelectItem value="retailer">{t.types.retailer}</SelectItem>
            <SelectItem value="exporter">{t.types.exporter}</SelectItem>
            <SelectItem value="trader">{t.types.trader}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            {t.password}
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder={t.placeholder.password}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            {t.confirmPassword}
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t.placeholder.confirmPassword}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Account..." : t.signup}
      </Button>
    </form>
  )
}
