"use client"

import { useState } from "react"

export function TestDbConnection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const testConnection = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      if (data.success) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while testing the connection")
    }
  }

  return (
    <div className="p-4 bg-card rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground">Database Connection Test</h2>
      <button onClick={testConnection} className="philosophical-button mb-4" disabled={status === "loading"}>
        {status === "loading" ? "Testing..." : "Test Database Connection"}
      </button>
      {status !== "idle" && (
        <p className={`mt-2 ${status === "success" ? "text-primary" : "text-destructive"}`}>{message}</p>
      )}
    </div>
  )
}


