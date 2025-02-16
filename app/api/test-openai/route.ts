import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a test response. Reply with 'OpenAI integration successful!'",
        },
        {
          role: "user",
          content: "Test the connection",
        },
      ],
    })

    return NextResponse.json({
      success: true,
      message: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error("OpenAI API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to OpenAI API",
      },
      { status: 500 },
    )
  }
}


