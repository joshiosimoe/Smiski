"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SubmitData() {
  const [data, setData] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this data to a backend for processing
    // For this example, we'll just store it in localStorage
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]")
    submissions.push({ data, timestamp: new Date().toISOString() })
    localStorage.setItem("submissions", JSON.stringify(submissions))
    alert("Data submitted successfully!")
    setData("")
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Submit Data</h1>
        <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="data" className="block text-sm font-medium text-card-foreground mb-2">
              Enter your data (comma-separated values)
            </label>
            <textarea
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border rounded-md bg-input text-input-foreground"
              rows={5}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/90 transition-colors"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


