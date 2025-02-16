"use client"

import { useState, useEffect } from "react"
import { PhilosophicalSpinner } from "@/components/PhilosophicalSpinner"

export default function TestPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/test-openai")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success")
          setMessage(data.message)
        } else {
          setStatus("error")
          setMessage(data.error)
        }
      })
      .catch((error) => {
        setStatus("error")
        setMessage("Failed to test OpenAI connection")
      })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-card-foreground">OpenAI Integration Test</h1>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <PhilosophicalSpinner />
            <p className="text-muted-foreground">Testing OpenAI connection...</p>
          </div>
        )}

        {status === "success" && (
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-primary font-medium">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-destructive font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}


