import { NextResponse } from "next/server"
import { findUserByEmail, validatePassword } from "@/models/User"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValidPassword = await validatePassword(user, password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real-world application, you would generate and return a JWT token here
    return NextResponse.json({ user: { ...user, password: undefined } }, { status: 200 })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


