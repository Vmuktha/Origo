"use client"

import type React from "react"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface AudioButtonProps {
  text: string
  className?: string
}

const odiaNumbers: Record<string, string> = {
  "0": "shunya",
  "1": "eka",
  "2": "dui",
  "3": "tini",
  "4": "chari",
  "5": "pancha",
  "6": "chha",
  "7": "saata",
  "8": "aatha",
  "9": "nau",
  "10": "dasha",
  "20": "kodi",
  "30": "tishi",
  "40": "chalis",
  "50": "pachaas",
  "60": "saathi",
  "70": "satturi",
  "80": "aasi",
  "90": "nabbe",
  "100": "eka sau",
  "1000": "eka hazaar",
}

const odiaToPhonetic: Record<string, string> = {
  // Login screen
  "QR କୋଡ୍ ଲଗଇନ୍": "QR code login",
  "କଲ୍ ଦ୍ୱାରା OTP": "Call dwara OTP",
  "SMS ଦ୍ୱାରା OTP": "SMS dwara OTP",

  // Dashboard
  "ବିକ୍ରୟ. ଫସଲ ବିକ୍ରୟ କରନ୍ତୁ": "Bikraya. Fasal bikraya karantu",
  "AI ସ୍କ୍ୟାନ୍. ଫସଲ ଯାଞ୍ଚ କରନ୍ତୁ": "AI scan. Fasal yancha karantu",
  "ବଜାର ଦର. ମଣ୍ଡି ଦର ଦେଖନ୍ତୁ": "Bazaar dar. Mandi dar dekhantu",
  "ନିଲାମ. ନିଲାମ ଦେଖନ୍ତୁ": "Nilam. Nilam dekhantu",
  "ମୋର ବିକ୍ରୟ": "Mor bikraya",
  "ମିତ୍ର ସହାୟତା": "Mitra sahayata",

  // Common words with better phonetics
  ଓରିଗୋ: "Origo",
  କୃଷକ: "Krushak",
  ଫସଲ: "Fasal",
  ବିକ୍ରୟ: "Bikraya",
  ବଜାର: "Bazaar",
  ଦର: "Dar",
  ନିଲାମ: "Nilam",
  ସ୍କ୍ୟାନ୍: "Scan",
  ଯାଞ୍ଚ: "Yancha",
  ଦେଖନ୍ତୁ: "Dekhantu",
  କରନ୍ତୁ: "Karantu",
  ମୋର: "Mor",
  ଦ୍ୱାରା: "Dwara",
  କ୍ୱିଣ୍ଟାଲ: "quintal",
  ଟମାଟୋ: "tomato",
  ମକା: "makai",
  ଅନ୍ୟାନ୍ୟ: "onyanya",
  ଧାନ: "dhan",
  ମିତ୍ର: "mitra",
  ସହାୟତା: "sahayata",
  "ସ୍ଥିର ରଖନ୍ତୁ, ଏବେ ଫଟୋ ଉଠାନ୍ତୁ": "sthir rakhantu, ebe photo uthantu",
  "ନିର୍ଦ୍ଦିଷ୍ଟ ଦର": "nirdishta dar",
}

function convertNumbersToOdia(text: string): string {
  // Handle currency symbols
  text = text.replace(/₹/g, "rupees ")

  // Handle comma-separated numbers (like 2,150)
  text = text.replace(/(₹?\s*\d{1,3}(?:,\d{3})*)/g, (match) => {
    const cleanMatch = match.replace(/₹|\s/g, "")
    const number = cleanMatch.replace(/,/g, "")
    return "rupees " + convertSingleNumberToOdia(number)
  })

  // Handle individual digits that aren't part of larger numbers
  text = text.replace(/\b\d\b/g, (digit) => odiaNumbers[digit] || digit)

  return text
}

function convertSingleNumberToOdia(numStr: string): string {
  const num = Number.parseInt(numStr)

  if (num === 0) return "shunya"
  if (num < 10) return odiaNumbers[num.toString()] || numStr
  if (num === 10) return "dasha"
  if (num < 20) {
    const ones = num % 10
    return odiaNumbers[ones.toString()] + " dasha"
  }
  if (num < 100) {
    const tens = Math.floor(num / 10) * 10
    const ones = num % 10
    let result = odiaNumbers[tens.toString()] || odiaNumbers[Math.floor(num / 10).toString()] + " dashi"
    if (ones > 0) result += " " + odiaNumbers[ones.toString()]
    return result
  }
  if (num < 1000) {
    const hundreds = Math.floor(num / 100)
    const remainder = num % 100
    let result = odiaNumbers[hundreds.toString()] + " sau"
    if (remainder > 0) result += " " + convertSingleNumberToOdia(remainder.toString())
    return result
  }
  if (num < 100000) {
    const thousands = Math.floor(num / 1000)
    const remainder = num % 1000
    let result = convertSingleNumberToOdia(thousands.toString()) + " hazaar"
    if (remainder > 0) result += " " + convertSingleNumberToOdia(remainder.toString())
    return result
  }

  return numStr // Fallback for very large numbers
}

export function AudioButton({ text, className = "" }: AudioButtonProps) {
  const { language } = useLanguage()

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation()

    if ("speechSynthesis" in window) {
      console.log("[v0] Starting audio playback for:", text, "Language:", language)

      // Cancel any ongoing speech
      speechSynthesis.cancel()

      const speakText = () => {
        let textToSpeak = text
        if (language === "odia") {
          // First convert numbers
          textToSpeak = convertNumbersToOdia(text)
          console.log("[v0] After number conversion:", textToSpeak)

          // Check for exact phonetic translations first
          if (odiaToPhonetic[text]) {
            textToSpeak = odiaToPhonetic[text]
            console.log("[v0] Using exact phonetic translation:", textToSpeak)
          } else {
            // Try to find partial matches for longer texts
            let foundTranslation = false
            for (const [odiaText, phoneticText] of Object.entries(odiaToPhonetic)) {
              if (text.includes(odiaText)) {
                textToSpeak = text.replace(odiaText, phoneticText)
                textToSpeak = convertNumbersToOdia(textToSpeak)
                foundTranslation = true
                console.log("[v0] Using partial phonetic translation:", textToSpeak)
                break
              }
            }

            if (!foundTranslation) {
              textToSpeak = textToSpeak
                .replace(/କ/g, "ka")
                .replace(/ର/g, "ra")
                .replace(/ଣ/g, "na")
                .replace(/ତ/g, "ta")
                .replace(/ଉ/g, "u")
                .replace(/ଦ/g, "da")
                .replace(/ଯ/g, "ya")
                .replace(/ଲ/g, "la")
                .replace(/ଗ/g, "ga")
                .replace(/ଇ/g, "i")
                .replace(/ନ/g, "na")
                .replace(/ଫ/g, "pha")
                .replace(/ସ/g, "sa")
                .replace(/ବ/g, "ba")
                .replace(/ମ/g, "ma")
                .replace(/ଅ/g, "a")
                .replace(/ଆ/g, "aa")
                .replace(/ଏ/g, "e")
                .replace(/ଓ/g, "o")
                .replace(/ଟ/g, "ta")
                .replace(/ଡ/g, "da")
                .replace(/ଠ/g, "tha")
                .replace(/ଢ/g, "dha")
                .replace(/ଚ/g, "cha")
                .replace(/ଜ/g, "ja")
                .replace(/ଛ/g, "chha")
                .replace(/ଝ/g, "jha")
                .replace(/ପ/g, "pa")
                .replace(/ଶ/g, "sha")
                .replace(/ଷ/g, "sha")
                .replace(/ହ/g, "ha")
                .replace(/ଥ/g, "tha")
                .replace(/ଧ/g, "dha")
                .replace(/ଭ/g, "bha")
                .replace(/ଖ/g, "kha")
                .replace(/ଘ/g, "gha")
                .replace(/ଙ/g, "nga")
                .replace(/ଞ/g, "nya")
                .replace(/ଵ/g, "wa")
                .replace(/ଯ଼/g, "ya")
                .replace(/ଡ଼/g, "ra")
                .replace(/ଢ଼/g, "rha")
                .replace(/ା/g, "aa")
                .replace(/ି/g, "i")
                .replace(/ୀ/g, "ii")
                .replace(/ୁ/g, "u")
                .replace(/ୂ/g, "uu")
                .replace(/େ/g, "e")
                .replace(/ୈ/g, "ai")
                .replace(/ୋ/g, "o")
                .replace(/ୌ/g, "au")
                .replace(/ଂ/g, "n")
                .replace(/ଃ/g, "h")
                .replace(/୍/g, "") // Remove halant
                .replace(/଼/g, "") // Remove nukta
                // Clean up multiple spaces
                .replace(/\s+/g, " ")
                .trim()
              console.log("[v0] Using improved character-based phonetic:", textToSpeak)
            }
          }
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak)
        const voices = speechSynthesis.getVoices()

        console.log(
          "[v0] Available voices:",
          voices.map((v) => ({ name: v.name, lang: v.lang })),
        )

        if (language === "odia") {
          let targetVoice = voices.find(
            (voice) =>
              voice.lang === "en-IN" ||
              (voice.lang.includes("en") && voice.name.toLowerCase().includes("indian")) ||
              voice.name.toLowerCase().includes("rishi"),
          )

          if (!targetVoice) {
            // Fallback to any English voice
            targetVoice = voices.find((voice) => voice.lang.includes("en"))
          }

          if (targetVoice) {
            console.log("[v0] Using English voice for phonetic Odia:", targetVoice.name)
            utterance.voice = targetVoice
            utterance.lang = "en-IN"
            utterance.rate = 0.6 // Slower for better pronunciation
          }
        } else {
          // English language - find best English voice
          const targetVoice = voices.find(
            (voice) =>
              voice.lang === "en-IN" ||
              (voice.lang.includes("en") && voice.name.toLowerCase().includes("indian")) ||
              voice.lang === "en-US" ||
              voice.lang.includes("en"),
          )

          if (targetVoice) {
            console.log("[v0] Using English voice:", targetVoice.name)
            utterance.voice = targetVoice
            utterance.lang = "en-IN"
          }

          utterance.rate = 0.7
        }

        // Common settings
        utterance.pitch = 1
        utterance.volume = 1

        // Enhanced error handling and event logging
        utterance.onstart = () => {
          console.log("[v0] Speech started")
        }

        utterance.onend = () => {
          console.log("[v0] Speech ended")
        }

        utterance.onerror = (event) => {
          console.log("[v0] Speech synthesis error:", event.error, event)
          // Try again with default voice if there was an error
          if (event.error === "voice-unavailable" || event.error === "language-unavailable") {
            console.log("[v0] Retrying with default voice")
            const fallbackUtterance = new SpeechSynthesisUtterance(textToSpeak)
            fallbackUtterance.rate = language === "odia" ? 0.6 : 0.7
            fallbackUtterance.pitch = 1
            fallbackUtterance.volume = 1
            speechSynthesis.speak(fallbackUtterance)
          }
        }

        console.log("[v0] Speaking with voice:", utterance.voice?.name || "default", "Rate:", utterance.rate)
        speechSynthesis.speak(utterance)
      }

      // Check if voices are already loaded
      if (speechSynthesis.getVoices().length > 0) {
        speakText()
      } else {
        // Wait for voices to load
        console.log("[v0] Waiting for voices to load...")
        speechSynthesis.onvoiceschanged = () => {
          console.log("[v0] Voices loaded, attempting speech")
          speakText()
          speechSynthesis.onvoiceschanged = null // Remove listener
        }

        // Fallback timeout in case voices don't load
        setTimeout(() => {
          if (speechSynthesis.getVoices().length === 0) {
            console.log("[v0] Voices still not loaded, trying anyway")
            speakText()
          }
        }, 1000)
      }
    } else {
      console.log("[v0] Speech synthesis not supported")
      alert(language === "odia" ? "ଅଡିଓ ସପୋର୍ଟ ନାହିଁ" : "Audio not supported")
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={playAudio}
      className={`p-2 h-8 w-8 hover:bg-primary/10 ${className}`}
      aria-label="Play audio"
    >
      <Volume2 className="w-4 h-4" />
    </Button>
  )
}
