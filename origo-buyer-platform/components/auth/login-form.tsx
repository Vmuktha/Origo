"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Lock, Building } from "lucide-react"

interface LoginFormProps {
  onSuccess: () => void
  language: "en" | "od"
}

export function LoginForm({ onSuccess, language }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    buyerType: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const text = {
    en: {
      email: "Email Address",
      password: "Password",
      buyerType: "Buyer Type",
      types: {
        wholesaler: "Wholesaler / Aggregator",
        retailer: "Retailer / Retail Chain",
        exporter: "Exporter / FMCG / Processor",
        trader: "Local Trader / Hotel / Co-op",
      },
      login: "Login",
      placeholder: {
        email: "Enter your business email",
        password: "Enter your password",
      },
    },
    od: {
      email: "ଇମେଲ୍ ଠିକଣା",
      password: "ପାସୱାର୍ଡ",
      buyerType: "କ୍ରେତା ପ୍ରକାର",
      types: {
        wholesaler: "ହୋଲସେଲର / ଏଗ୍ରିଗେଟର",
        retailer: "ରିଟେଲର / ରିଟେଲ ଚେନ୍",
        exporter: "ରପ୍ତାନିକାରୀ / FMCG / ପ୍ରୋସେସର",
        trader: "ସ୍ଥାନୀୟ ବ୍ୟବସାୟୀ / ହୋଟେଲ / କୋ-ଅପ୍",
      },
      login: "ଲଗଇନ୍",
      placeholder: {
        email: "ଆପଣଙ୍କ ବ୍ୟବସାୟିକ ଇମେଲ୍ ପ୍ରବେଶ କରନ୍ତୁ",
        password: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
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
        <Label htmlFor="buyerType" className="text-sm font-medium">
          {t.buyerType}
        </Label>
        <Select value={formData.buyerType} onValueChange={(value) => setFormData({ ...formData, buyerType: value })}>
          <SelectTrigger className="w-full">
            <Building className="w-4 h-4 mr-2 text-muted-foreground" />
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : t.login}
      </Button>
    </form>
  )
}
