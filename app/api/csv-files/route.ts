import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getCsvFilesByUserId } from "@/models/CsvFile"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const files = await getCsvFilesByUserId(session.user.id)

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Error fetching CSV files:", error)
    return NextResponse.json({ error: "Failed to fetch CSV files" }, { status: 500 })
  }
}


