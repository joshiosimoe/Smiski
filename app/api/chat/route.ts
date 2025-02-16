kimport { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getCsvFileById } from "@/models/CsvFile"

export async function GET(request: Request, { params }: { params: { fileId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { fileId } = params
    const csvFile = await getCsvFileById(fileId, session.user.id)

    if (!csvFile) {
      return NextResponse.json({ error: "CSV file not found" }, { status: 404 })
    }

    return NextResponse.json({
      fileName: csvFile.fileName,
    })
  } catch (error) {
    console.error("Error fetching CSV file info:", error)
    return NextResponse.json({ error: "Failed to fetch CSV file info" }, { status: 500 })
  }
}


