// Lightweight confetti component using canvas-confetti CDN
import { useEffect } from "react"

interface ConfettiProps {
  trigger: boolean
}

export default function Confetti({ trigger }: ConfettiProps) {
  useEffect(() => {
    if (!trigger) return
    // Dynamically load canvas-confetti from CDN
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
    script.async = true
    document.body.appendChild(script)
    script.onload = () => {
      // @ts-ignore
      if (window.confetti) {
        // @ts-ignore
        window.confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.7 },
        })
      }
    }
    return () => {
      document.body.removeChild(script)
    }
  }, [trigger])
  return null
}
