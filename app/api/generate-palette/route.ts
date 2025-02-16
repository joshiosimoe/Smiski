import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  console.log("Starting color palette generation")
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set")
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    console.log("Calling OpenAI API")
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a color palette generator. Respond with only a JSON array of 5 hexadecimal color codes.",
        },
        {
          role: "user",
          content: "Generate a harmonious color palette suitable for a philosophical data visualization website.",
        },
      ],
    })

    console.log("OpenAI API response received")
    const content = completion.choices[0].message.content
    if (!content) {
      console.error("No content received from OpenAI")
      return NextResponse.json({ error: "No content received from OpenAI" }, { status: 500 })
    }

    console.log("OpenAI response content:", content)

    let colorPalette: string[]
    try {
      colorPalette = JSON.parse(content)
      console.log("Parsed color palette:", colorPalette)
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError)
      return NextResponse.json({ error: "Invalid response format from OpenAI", details: content }, { status: 500 })
    }

    if (!Array.isArray(colorPalette) || colorPalette.length !== 5) {
      console.error("Invalid color palette received:", colorPalette)
      return NextResponse.json({ error: "Invalid color palette received", details: content }, { status: 500 })
    }

    console.log("Returning color palette:", colorPalette)
    return NextResponse.json({ colors: colorPalette })
  } catch (error) {
    console.error("Error generating color palette:", error)
    return NextResponse.json({ error: "Failed to generate color palette", details: error.message }, { status: 500 })
  }
}


