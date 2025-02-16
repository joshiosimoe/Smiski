import type { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"

export interface User {
  _id?: ObjectId
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export async function createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<User>("users")

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(userData.password, salt)

  const newUser: User = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await collection.insertOne(newUser)
  return { ...newUser, _id: result.insertedId }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<User>("users")

  return collection.findOne({ email })
}

export async function validatePassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password)
}

export async function updateUser(userId: ObjectId, updateData: Partial<User>): Promise<User | null> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<User>("users")

  if (updateData.password) {
    const salt = await bcrypt.genSalt(10)
    updateData.password = await bcrypt.hash(updateData.password, salt)
  }

  const result = await collection.findOneAndUpdate(
    { _id: userId },
    { $set: { ...updateData, updatedAt: new Date() } },
    { returnDocument: "after" },
  )

  return result.value
}

export async function deleteUser(userId: ObjectId): Promise<boolean> {
  const client = await clientPromise
  const db = client.db("kerano")
  const collection = db.collection<User>("users")

  const result = await collection.deleteOne({ _id: userId })
  return result.deletedCount === 1
}


