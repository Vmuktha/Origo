"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Minus, Camera, Check } from "lucide-react"
import { AudioButton } from "@/components/audio-button"
import { useLanguage } from "@/contexts/language-context"

interface SellCropFlowProps {
  onBack: () => void
}

type Step = "crop-selection" | "quantity" | "sale-type" | "ai-scan" | "confirmation"

export function SellCropFlow({ onBack }: SellCropFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>("crop-selection")
  const { getText } = useLanguage()
  const [selectedCrop, setSelectedCrop] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [saleType, setSaleType] = useState("")
  const [syncStatus, setSyncStatus] = useState<"saved" | "pending" | "synced">("saved")

  const crops = [
    { id: "paddy", name: getText("ଧାନ", "Paddy"), icon: "🌾" },
    { id: "tomato", name: getText("ଟମାଟୋ", "Tomato"), icon: "🍅" },
    { id: "maize", name: getText("ମକା", "Maize"), icon: "🌽" },
    { id: "other", name: getText("ଅନ୍ୟାନ୍ୟ", "Other"), icon: "🌱" },
  ]

  const handleNext = () => {
    const steps: Step[] = ["crop-selection", "quantity", "sale-type", "ai-scan", "confirmation"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleConfirm = () => {
    setSyncStatus("synced")
    setTimeout(() => onBack(), 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "crop-selection":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              {getText("ଫସଲ ବାଛନ୍ତୁ", "Select Crop")}
              <AudioButton text={getText("ଫସଲ ବାଛନ୍ତୁ", "Select Crop")} />
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {crops.map((crop) => (
                <Card
                  key={crop.id}
                  className={`cursor-pointer transition-all ${
                    selectedCrop === crop.id ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedCrop(crop.id)}
                >
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="text-4xl">{crop.icon}</div>
                    <p className="font-semibold">{crop.name}</p>
                    <AudioButton text={crop.name} />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button onClick={handleNext} disabled={!selectedCrop} className="w-full h-12" size="lg">
              {getText("ପରବର୍ତ୍ତୀ", "Next")}
            </Button>
          </div>
        )

      case "quantity":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              {getText("ପରିମାଣ ଲେଖନ୍ତୁ", "Enter Quantity")}
              <AudioButton text={getText("ପରିମାଣ ଲେଖନ୍ତୁ", "Enter Quantity")} />
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12"
              >
                <Minus className="w-6 h-6" />
              </Button>
              <div className="text-center">
                <div className="text-3xl font-bold">{quantity}</div>
                <p className="text-sm text-muted-foreground">{getText("କ୍ୱିଣ୍ଟାଲ", "Quintals")}</p>
                <AudioButton text={`${quantity} ${getText("କ୍ୱିଣ୍ଟାଲ", "Quintals")}`} />
              </div>
              <Button variant="outline" size="lg" onClick={() => setQuantity(quantity + 1)} className="w-12 h-12">
                <Plus className="w-6 h-6" />
              </Button>
            </div>
            <Button onClick={handleNext} className="w-full h-12" size="lg">
              {getText("ପରବର୍ତ୍ତୀ", "Next")}
            </Button>
          </div>
        )

      case "sale-type":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              {getText("ବିକ୍ରୟ ପ୍ରକାର", "Sale Type")}
              <AudioButton text={getText("ବିକ୍ରୟ ପ୍ରକାର", "Sale Type")} />
            </h2>
            <div className="space-y-3">
              <Card
                className={`cursor-pointer transition-all ${
                  saleType === "fixed" ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => setSaleType("fixed")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{getText("ନିର୍ଦ୍ଦିଷ୍ଟ ଦର", "Fixed Price")}</h3>
                    <p className="text-sm text-muted-foreground">{getText("ଆପଣ ଦର ଠିକ୍ କରନ୍ତୁ", "Set your own price")}</p>
                  </div>
                  <AudioButton text={getText("ନିର୍ଦ୍ଦିଷ୍ଟ ଦର", "Fixed Price")} />
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-all ${
                  saleType === "auction" ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => setSaleType("auction")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{getText("ନିଲାମ", "Auction")}</h3>
                    <p className="text-sm text-muted-foreground">{getText("ସର୍ବୋଚ୍ଚ ଦର ପାଆନ୍ତୁ", "Get the best price")}</p>
                  </div>
                  <AudioButton text={getText("ନିଲାମ", "Auction")} />
                </CardContent>
              </Card>
            </div>
            <Button onClick={handleNext} disabled={!saleType} className="w-full h-12" size="lg">
              {getText("ପରବର୍ତ୍ତୀ", "Next")}
            </Button>
          </div>
        )

      case "ai-scan":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              {getText("AI ସ୍କ୍ୟାନ୍", "AI Scan")}
              <AudioButton text={getText("AI ସ୍କ୍ୟାନ୍", "AI Scan")} />
            </h2>
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="p-8 text-center space-y-4">
                <Camera className="w-16 h-16 mx-auto text-primary" />
                <div>
                  <p className="font-semibold">{getText("ସ୍ଥିର ରଖନ୍ତୁ, ଏବେ ଫଟୋ ଉଠାନ୍ତୁ", "Hold steady, capture now")}</p>
                  <p className="text-sm text-muted-foreground">{getText("୩ଟି ଫଟୋ ଉଠାନ୍ତୁ", "Take 3 photos")}</p>
                </div>
                <AudioButton text={getText("ସ୍ଥିର ରଖନ୍ତୁ, ଏବେ ଫଟୋ ଉଠାନ୍ତୁ", "Hold steady, capture now")} />
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleNext} className="flex-1 h-12 bg-transparent">
                {getText("ଛାଡ଼ନ୍ତୁ", "Skip")}
              </Button>
              <Button onClick={handleNext} className="flex-1 h-12">
                {getText("ସ୍କ୍ୟାନ୍ କରନ୍ତୁ", "Scan Now")}
              </Button>
            </div>
          </div>
        )

      case "confirmation":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              {getText("ନିଶ୍ଚିତ କରନ୍ତୁ", "Confirmation")}
              <AudioButton text={getText("ନିଶ୍ଚିତ କରନ୍ତୁ", "Confirmation")} />
            </h2>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{getText("ଫସଲ", "Crop")}:</span>
                  <span className="font-semibold">{crops.find((c) => c.id === selectedCrop)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{getText("ପରିମାଣ", "Quantity")}:</span>
                  <span className="font-semibold">
                    {quantity} {getText("କ୍ୱିଣ୍ଟାଲ", "Quintals")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{getText("ବିକ୍ରୟ ପ୍ରକାର", "Sale Type")}:</span>
                  <span className="font-semibold">
                    {saleType === "fixed" ? getText("ନିର୍ଦ୍ଦିଷ୍ଟ ଦର", "Fixed Price") : getText("ନିଲାମ", "Auction")}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  syncStatus === "saved" ? "bg-yellow-500" : syncStatus === "pending" ? "bg-blue-500" : "bg-green-500"
                }`}
              />
              <span className="text-sm">
                {syncStatus === "saved" && getText("ଅଫଲାଇନ୍ ସେଭ୍", "Saved Offline")}
                {syncStatus === "pending" && getText("ସିଙ୍କ ବାକି", "Sync Pending")}
                {syncStatus === "synced" && getText("ସିଙ୍କ ହୋଇଗଲା", "Synced")}
              </span>
            </div>

            <Button onClick={handleConfirm} className="w-full h-12" size="lg">
              <Check className="w-5 h-5 mr-2" />
              {getText("ନିଶ୍ଚିତ କରନ୍ତୁ", "Confirm")}
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
          <h1 className="text-lg font-semibold">{getText("ଫସଲ ବିକ୍ରୟ", "Sell Crop")}</h1>
        </div>
      </div>

      <div className="p-4">{renderStepContent()}</div>
    </div>
  )
}
