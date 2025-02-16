"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PhilosophicalSpinner } from "@/components/PhilosophicalSpinner"
import type { CsvFile } from "@/models/CsvFile"

export default function History() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [files, setFiles] = useState<CsvFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchFiles()
    }
  }, [status, router])

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/csv-files")
      if (!response.ok) {
        throw new Error("Failed to fetch files")
      }
      const data = await response.json()
      setFiles(data.files)
    } catch (err) {
      setError("Failed to load files")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return <PhilosophicalSpinner />
  }

  if (error) {
    return <p className="text-destructive">{error}</p>
  }

  if (!session) {
    return null
  }

  return (
    <div className="bg-background p-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Processed CSV Files</h1>
      <div className="grid gap-6">
        {files.map((file) => (
          <div key={file._id?.toString()} className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">{file.fileName}</h2>
            <p className="text-muted-foreground mb-2">Uploaded on: {new Date(file.uploadDate).toLocaleString()}</p>
            <p className="text-muted-foreground mb-4">{file.summary}</p>
            <Link href={`/dashboard/chat/${file._id}`} className="philosophical-button inline-block">
              Engage in Dialogue
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}


