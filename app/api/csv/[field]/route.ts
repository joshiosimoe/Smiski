import { NextResponse } from "next/server"
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

    // Only send the summary and a small sample of the data
    const sampleData = csvFile.data.slice(0, 10) // Only send the first 10 rows as a sample

    return NextResponse.json({
      summary: csvFile.summary,
      sampleData: sampleData,
      totalRows: csvFile.data.length,
    })
  } catch (error) {
    console.error("Error fetching CSV data:", error)
    return NextResponse.json({ error: "Failed to fetch CSV data" }, { status: 500 })
  }
}


