"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { PhilosophicalSpinner } from "@/components/PhilosophicalSpinner"
import { Send, AlertCircle, ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface CsvFileInfo {
  fileName: string
}

export default function Chat() {
  const params = useParams()
  const fileId = Array.isArray(params.fileId) ? params.fileId[0] : params.fileId
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [csvFileInfo, setCsvFileInfo] = useState<CsvFileInfo | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && fileId) {
      fetchCsvFileInfo()
    }
  }, [status, router, fileId])

  const fetchCsvFileInfo = async () => {
    try {
      const response = await fetch(`/api/csv/${fileId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch CSV file info")
      }
      const data = await response.json()
      setCsvFileInfo(data)
    } catch (error) {
      console.error("Error fetching CSV file info:", error)
      setError("Failed to load CSV file information")
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) {
      setError("Please enter a message.")
      return
    }

    if (!fileId) {
      setError("No CSV file selected. Please go back and select a file.")
      return
    }

    setError(null)
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, message: input }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage: Message = { role: "assistant", content: data.response }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error in chat:", error)
      setError(`Failed to get a response. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return <PhilosophicalSpinner />
  }

  if (!session) {
    return null
  }

  return (
    <div className="bg-background p-8 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">CSV Data Dialogue</h1>
        <Link href="/dashboard" className="philosophical-button bg-secondary text-secondary-foreground">
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
      {csvFileInfo && (
        <div className="mb-4 p-4 bg-card rounded-lg flex items-center">
          <FileText className="mr-2 text-primary" />
          <span>Current CSV: {csvFileInfo.fileName}</span>
        </div>
      )}
      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <PhilosophicalSpinner />
          </div>
        )}
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive flex items-center">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
        className="flex"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="philosophical-input flex-grow mr-2"
          placeholder="Ask about the CSV data..."
        />
        <button type="submit" className="philosophical-button flex items-center" disabled={isLoading || !input.trim()}>
          <Send className="mr-2" />
          Send
        </button>
      </form>
    </div>
  )
}


