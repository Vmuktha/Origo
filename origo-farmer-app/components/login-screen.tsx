"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Phone, MessageSquare, Globe } from "lucide-react"
import { AudioButton } from "@/components/audio-button"
import { useLanguage } from "@/contexts/language-context"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { language, setLanguage, getText } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "odia" ? "english" : "odia")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">O</span>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">{getText("ଓରିଗୋ", "ORIGO")}</CardTitle>
          <p className="text-muted-foreground text-balance">
            {getText("ଓଡ଼ିଶା କୃଷକମାନଙ୍କ ପାଇଁ ଡିଜିଟାଲ ସମାଧାନ", "Digital Solution for Odisha Farmers")}
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="mx-auto flex items-center gap-2 bg-transparent"
          >
            <Globe className="w-4 h-4" />
            {language === "odia" ? "English" : "ଓଡ଼ିଆ"}
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button onClick={onLogin} className="w-full h-14 text-lg flex items-center justify-between" size="lg">
              <div className="flex items-center gap-3">
                <QrCode className="w-6 h-6" />
                <span>{getText("QR କୋଡ୍ ଲଗଇନ୍", "QR Code Login")}</span>
              </div>
              <AudioButton text={getText("QR କୋଡ୍ ଲଗଇନ୍", "QR Code Login")} />
            </Button>

            <Button
              onClick={onLogin}
              variant="outline"
              className="w-full h-14 text-lg flex items-center justify-between bg-transparent"
              size="lg"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6" />
                <span>{getText("କଲ୍ ଦ୍ୱାରା OTP", "OTP via Call")}</span>
              </div>
              <AudioButton text={getText("କଲ୍ ଦ୍ୱାରା OTP", "OTP via Call")} />
            </Button>

            <Button
              onClick={onLogin}
              variant="outline"
              className="w-full h-14 text-lg flex items-center justify-between bg-transparent"
              size="lg"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                <span>{getText("SMS ଦ୍ୱାରା OTP", "OTP via SMS")}</span>
              </div>
              <AudioButton text={getText("SMS ଦ୍ୱାରା OTP", "OTP via SMS")} />
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              {getText("ସହାୟତା ପାଇଁ: 1800-XXX-XXXX", "For help: 1800-XXX-XXXX")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
