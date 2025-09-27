import { GoogleGenAI } from "@google/genai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

// Generate creative prompt using Gemini
export async function generateCreativePrompt() {
  try {
    if (!GEMINI_API_KEY) {
      return {
        prompt: "A robot painting a sunset",
        error: "Gemini API key not configured. Using a default prompt instead.",
      }
    }
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:
        "Generate a funny, zenny, and creative drawing prompt for a paint/drawing game. The prompt must be at least 5 words, not a sentence or instruction, and not start with any verb. Make it playful and imaginative, but not too complex or detailed. Example: 'A cat meditating on a rainbow', 'Banana riding a skateboard at sunset', 'Penguin with sunglasses eating ice cream', 'Robot doing yoga in the park'. Return only the prompt." ,
    })
    let prompt = response.text?.trim() || "A robot painting a sunset"
    prompt = prompt.replace(/^(Draw|Paint|Sketch|Create|Make|Depict|Illustrate|Show|Showcase|Design|Imagine|Picture|Render)\s+(an?\s+)?/i, "").trim()
    prompt = prompt.replace(/[.]+$/, "")
    return { prompt }
  } catch (error) {
    console.log("Error generating prompt:", error)
    return {
      prompt: "Alien riding a giraffe in a neon city",
      error: "Failed to generate a new prompt. Using a default prompt instead.",
    }
  }
}

// Evaluate drawing using Gemini
export async function evaluateDrawing(imageBase64: string, prompt: string) {
  try {
    if (!GEMINI_API_KEY) {
      return generateFallbackScores(prompt)
    }
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
    const contents = [
      {
        inlineData: {
          mimeType: "image/png",
          data: imageBase64,
        },
      },
      {
        text: `Score this drawing based on the prompt: "${prompt}". Rate creativity (1-10), prompt adherence (1-10), artistic quality (1-10), and overall (1-10). Respond as JSON: {creativity: <number>, promptAdherence: <number>, artisticQuality: <number>, overall: <number>}`,
      },
    ]
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    })
    let text = response.text?.trim() || ""
    let scores = { creativity: 0, promptAdherence: 0, artisticQuality: 0, overall: 0 }
    try {
      const jsonContent = extractJsonFromText(text)
      if (jsonContent) {
        scores = JSON.parse(jsonContent)
      }
    } catch (err) {
      const nums = text.match(/\d+/g)?.map(Number) || []
      ;[scores.creativity, scores.promptAdherence, scores.artisticQuality, scores.overall] = nums
    }
    // Always attach the prompt used for scoring
    return {
      scores: { ...scores, prompt },
      success: true,
      raw: text,
    }
  } catch (error) {
    return generateFallbackScores(prompt)
  }
}

// Helper function to extract JSON from text that might be wrapped in markdown code blocks
function extractJsonFromText(text: string): string {
  // Check if the text contains a JSON code block
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (codeBlockMatch && codeBlockMatch[1]) {
    return codeBlockMatch[1].trim()
  }

  // If no code block is found, try to find JSON object directly
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    return jsonMatch[0].trim()
  }

  // If all else fails, return text.trim()
  return text.trim()
}

// Helper function to generate fallback scores when API key is missing or there's an error
function generateFallbackScores(prompt: string) {
  return {
    scores: {
      creativity: Number.parseFloat((Math.random() * 4 + 3).toFixed(1)), // 3.0 to 7.0
      promptAdherence: Number.parseFloat((Math.random() * 4 + 3).toFixed(1)),
      artisticQuality: Number.parseFloat((Math.random() * 4 + 3).toFixed(1)),
      overall: Number.parseFloat((Math.random() * 4 + 3).toFixed(1)),
      feedback: "Your artwork shows creativity and imagination! Keep exploring different techniques.",
      nftCard: {
        name: "DigitalArt",
        type: "Abstract",
        hp: Math.floor(Math.random() * 100) + 50,
        moves: [
          { name: "Visual Impact", damage: Math.floor(Math.random() * 50) + 20 },
          { name: "Color Harmony", damage: Math.floor(Math.random() * 70) + 30 },
        ],
        description: `A creative interpretation of "${prompt.substring(0, 30)}..."`,
      },
    },
    success: true,
    error: "Gemini API key not configured. Using fallback scores.",
  }
}

