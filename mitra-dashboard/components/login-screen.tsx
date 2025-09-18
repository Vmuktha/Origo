"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Volume2, Leaf } from "lucide-react"

interface LoginScreenProps {
  onLogin: () => void
  language: "en" | "od"
  setLanguage: (lang: "en" | "od") => void
}

const translations = {
  en: {
    title: "Mitra Dashboard",
    subtitle: "Agriculture Blockchain Platform",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    otpLabel: "OTP Code",
    otpPlaceholder: "Enter OTP",
    sendOtp: "Send OTP",
    verify: "Verify & Login",
    welcome: "Welcome to Origo Mitra",
    description:
      "Secure login for village-level agents to assist farmers with blockchain-verified agriculture services.",
  },
  od: {
    title: "ମିତ୍ର ଡ୍ୟାସବୋର୍ଡ",
    subtitle: "କୃଷି ବ୍ଲକଚେନ୍ ପ୍ଲାଟଫର୍ମ",
    phoneLabel: "ଫୋନ୍ ନମ୍ବର",
    phonePlaceholder: "ଆପଣଙ୍କ ଫୋନ୍ ନମ୍ବର ଲେଖନ୍ତୁ",
    otpLabel: "OTP କୋଡ୍",
    otpPlaceholder: "OTP ଲେଖନ୍ତୁ",
    sendOtp: "OTP ପଠାନ୍ତୁ",
    verify: "ଯାଞ୍ଚ କରି ଲଗଇନ୍",
    welcome: "ଓରିଗୋ ମିତ୍ରକୁ ସ୍ୱାଗତ",
    description: "ଗ୍ରାମ ସ୍ତରୀୟ ଏଜେଣ୍ଟମାନଙ୍କ ପାଇଁ ସୁରକ୍ଷିତ ଲଗଇନ୍ ଯାହା କୃଷକମାନଙ୍କୁ ବ୍ଲକଚେନ୍-ଯାଞ୍ଚିତ କୃଷି ସେବାରେ ସାହାଯ୍ୟ କରେ।",
  },
}

export default function LoginScreen({ onLogin, language, setLanguage }: LoginScreenProps) {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const t = translations[language]

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-US" : "or-IN"
      speechSynthesis.speak(utterance)
    }
  }

  const handleSendOtp = () => {
    const numericPhone = phone.replace(/\D/g, "") // Remove non-digits
    if (numericPhone.length >= 6) {
      setOtpSent(true)
      playAudio(language === "en" ? "OTP sent to your phone" : "ଆପଣଙ୍କ ଫୋନରେ OTP ପଠାଯାଇଛି")
    } else {
      alert(language === "en" ? "Please enter at least 6 digits" : "ଦୟାକରି ଅତି କମରେ ୬ଟି ଅଙ୍କ ଲେଖନ୍ତୁ")
    }
  }

  const handleLogin = () => {
    const numericOtp = otp.replace(/\D/g, "") // Remove non-digits
    if (numericOtp.length >= 4) {
      onLogin()
      playAudio(language === "en" ? "Login successful" : "ଲଗଇନ୍ ସଫଳ")
    } else {
      alert(language === "en" ? "Please enter at least 4 digits" : "ଦୟାକରି ଅତି କମରେ ୪ଟି ଅଙ୍କ ଲେଖନ୍ତୁ")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "od" : "en")}
            className="text-sm"
          >
            {language === "en" ? "ଓଡ଼ିଆ" : "English"}
          </Button>
        </div>

        <Card className="shadow-lg border-green-200">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-green-800 flex items-center justify-center gap-2">
                {t.title}
                <Button variant="ghost" size="sm" onClick={() => playAudio(t.title)} className="p-1 h-auto">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription className="text-green-600 mt-2">{t.subtitle}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 flex items-center justify-center gap-2">
                {t.welcome}
                <Button variant="ghost" size="sm" onClick={() => playAudio(t.welcome)} className="p-1 h-auto">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </h3>
              <p className="text-sm text-green-600 mt-2 text-balance">{t.description}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-green-800 flex items-center gap-2">
                  {t.phoneLabel}
                  <Button variant="ghost" size="sm" onClick={() => playAudio(t.phoneLabel)} className="p-1 h-auto">
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "") // Only allow digits
                    setPhone(value)
                  }}
                  className="border-green-200 focus:border-green-400"
                  disabled={otpSent}
                  maxLength={10}
                />
              </div>

              {!otpSent ? (
                <Button
                  onClick={handleSendOtp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={phone.replace(/\D/g, "").length < 6}
                >
                  {t.sendOtp}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-green-800 flex items-center gap-2">
                      {t.otpLabel}
                      <Button variant="ghost" size="sm" onClick={() => playAudio(t.otpLabel)} className="p-1 h-auto">
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder={t.otpPlaceholder}
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "") // Only allow digits
                        setOtp(value)
                      }}
                      className="border-green-200 focus:border-green-400"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={handleLogin}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={otp.replace(/\D/g, "").length < 4}
                  >
                    {t.verify}
                  </Button>
                  <Button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp("")
                    }}
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
                    {language === "en" ? "Back" : "ପଛକୁ"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
