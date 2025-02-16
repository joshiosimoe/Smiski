import { NextResponse } from "next/server"
import { createUser, findUserByEmail } from "@/models/User"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    const newUser = await createUser({ username, email, password })
    const userWithoutPassword = { ...newUser, password: undefined }
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


