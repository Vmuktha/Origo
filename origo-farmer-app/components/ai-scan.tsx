"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera, CheckCircle } from "lucide-react"
import { AudioButton } from "@/components/audio-button"
import { useLanguage } from "@/contexts/language-context"

interface AIScanProps {
  onBack: () => void
}

export function AIScan({ onBack }: AIScanProps) {
  const { getText } = useLanguage()
  const [scanStep, setScanStep] = useState<"instructions" | "scanning" | "results">("instructions")

  const startScan = () => {
    setScanStep("scanning")
    // Simulate scanning process
    setTimeout(() => {
      setScanStep("results")
    }, 3000)
  }

  const renderContent = () => {
    switch (scanStep) {
      case "instructions":
        return (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <Camera className="w-16 h-16 mx-auto text-primary" />
                <div>
                  <h3 className="font-bold text-lg mb-2">{getText("AI ସ୍କ୍ୟାନ୍ ନିର୍ଦ୍ଦେଶ", "AI Scan Instructions")}</h3>
                  <p className="text-balance">
                    {getText(
                      "ଫସଲର ୩ଟି ଫଟୋ ଉଠାନ୍ତୁ - ପତ୍ର, ଫଳ ଏବଂ ସମଗ୍ର ଗଛ",
                      "Take 3 photos of your crop - leaves, fruit, and whole plant",
                    )}
                  </p>
                </div>
                <AudioButton
                  text={getText(
                    "ଫସଲର ୩ଟି ଫଟୋ ଉଠାନ୍ତୁ - ପତ୍ର, ଫଳ ଏବଂ ସମଗ୍ର ଗଛ",
                    "Take 3 photos of your crop - leaves, fruit, and whole plant",
                  )}
                />
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                {getText("ଟିପ୍ସ", "Tips")}
                <AudioButton text={getText("ଟିପ୍ସ", "Tips")} />
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{getText("ଭଲ ଆଲୋକରେ ଫଟୋ ଉଠାନ୍ତୁ", "Take photos in good lighting")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{getText("କ୍ୟାମେରା ସ୍ଥିର ରଖନ୍ତୁ", "Keep camera steady")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{getText("ଫସଲ ପାଖରୁ ଫଟୋ ଉଠାନ୍ତୁ", "Take photos close to the crop")}</span>
                </li>
              </ul>
            </div>

            <Button onClick={startScan} className="w-full h-12" size="lg">
              <Camera className="w-5 h-5 mr-2" />
              {getText("ସ୍କ୍ୟାନ୍ ଆରମ୍ଭ କରନ୍ତୁ", "Start Scanning")}
            </Button>
          </div>
        )

      case "scanning":
        return (
          <div className="space-y-6 text-center">
            <div className="animate-pulse">
              <Camera className="w-20 h-20 mx-auto text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{getText("ସ୍କ୍ୟାନ୍ କରୁଛି...", "Scanning...")}</h3>
              <p className="text-muted-foreground">{getText("ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ", "Please wait")}</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        )

      case "results":
        return (
          <div className="space-y-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center space-y-4">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <div>
                  <h3 className="font-bold text-lg text-green-700 mb-2">{getText("ସ୍ୱାସ୍ଥ୍ୟକର ଫସଲ", "Healthy Crop")}</h3>
                  <p className="text-green-600">
                    {getText("ଆପଣଙ୍କ ଫସଲ ଭଲ ଅବସ୍ଥାରେ ଅଛି", "Your crop is in good condition")}
                  </p>
                </div>
                <AudioButton text={getText("ଆପଣଙ୍କ ଫସଲ ଭଲ ଅବସ୍ଥାରେ ଅଛି", "Your crop is in good condition")} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3">
                <h4 className="font-semibold">{getText("ସୁପାରିଶ", "Recommendations")}</h4>
                <ul className="space-y-2 text-sm">
                  <li>• {getText("ନିୟମିତ ପାଣି ଦିଅନ୍ତୁ", "Water regularly")}</li>
                  <li>• {getText("ଆଗାମୀ ସପ୍ତାହରେ ଅମଳ କରନ୍ତୁ", "Harvest next week")}</li>
                  <li>• {getText("କୀଟନାଶକ ଆବଶ୍ୟକ ନାହିଁ", "No pesticide needed")}</li>
                </ul>
              </CardContent>
            </Card>

            <Button onClick={onBack} className="w-full h-12" size="lg">
              {getText("ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ", "Back to Dashboard")}
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            {getText("AI ସ୍କ୍ୟାନ୍", "AI Scan")}
            <AudioButton text={getText("AI ସ୍କ୍ୟାନ୍", "AI Scan")} />
          </h1>
        </div>
      </div>

      <div className="p-4">{renderContent()}</div>
    </div>
  )
}
