import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("kerano")

    // Perform a simple query to test the connection
    const collection = db.collection("test")
    const result = await collection.insertOne({ test: "Hello MongoDB" })

    return NextResponse.json({ success: true, message: "Connected to MongoDB", insertedId: result.insertedId })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, message: "Failed to connect to MongoDB" }, { status: 500 })
  }
}



