import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { createCsvFile } from "@/models/CsvFile"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const csvContent = await file.text()

    const csvFile = await createCsvFile({
      userId: session.user.id,
      fileName: file.name,
      uploadDate: new Date(),
      csvContent: csvContent,
    })

    return NextResponse.json({ success: true, fileId: csvFile._id })
  } catch (error) {
    console.error("Error processing CSV:", error)
    return NextResponse.json({ error: "Failed to process CSV" }, { status: 500 })
  }
}


