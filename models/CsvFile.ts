import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export interface CsvFile {
  _id?: ObjectId
  userId: string
  fileName: string
  uploadDate: Date
  csvContent: string // Store the entire CSV as a string
}

export async function createCsvFile(csvFileData: Omit<CsvFile, "_id">): Promise<CsvFile> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<CsvFile>("csvFiles")

  const result = await collection.insertOne(csvFileData)
  return { ...csvFileData, _id: result.insertedId }
}

export async function getCsvFilesByUserId(userId: string): Promise<Omit<CsvFile, "csvContent">[]> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<CsvFile>("csvFiles")

  return collection
    .find({ userId }, { projection: { csvContent: 0 } })
    .sort({ uploadDate: -1 })
    .toArray()
}

export async function getCsvFileById(fileId: string, userId: string): Promise<CsvFile | null> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<CsvFile>("csvFiles")

  return collection.findOne({ _id: new ObjectId(fileId), userId })
}

export async function deleteCsvFile(fileId: string, userId: string): Promise<boolean> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<CsvFile>("csvFiles")

  const result = await collection.deleteOne({ _id: new ObjectId(fileId), userId })
  return result.deletedCount === 1
}


