"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { generateAndApplyRandomColors } from "@/utils/colorCustomization"
import { PhilosophicalQuote } from "@/components/PhilosophicalQuote"
import { FloatingShapes } from "@/components/FloatingShapes"
import { CsvUploader } from "@/components/CsvUploader"
import { PhilosophicalSpinner } from "@/components/PhilosophicalSpinner"
import { CsvSelector } from "@/components/CsvSelector"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedCsvId, setSelectedCsvId] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  const handleRandomizeColors = () => {
    generateAndApplyRandomColors()
  }

  const handleCsvSelect = (csvId: string) => {
    setSelectedCsvId(csvId)
    router.push(`/dashboard/chat/${csvId}`)
  }

  const handleCsvUpload = (csvId: string) => {
    setSelectedCsvId(csvId)
    router.push(`/dashboard/chat/${csvId}`)
  }

  if (status === "loading") {
    return <PhilosophicalSpinner />
  }

  if (!session) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-background p-8 overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome, {session.user?.name}</h1>
          <div className="space-x-4">
            <button onClick={handleRandomizeColors} className="philosophical-button bg-accent text-accent-foreground">
              Shift Paradigm
            </button>
            <button onClick={handleLogout} className="philosophical-button bg-destructive text-destructive-foreground">
              Transcend
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Your CSV Files</h2>
            <CsvSelector onSelect={handleCsvSelect} />
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Upload New CSV</h2>
            <CsvUploader onUpload={handleCsvUpload} />
          </div>
        </div>
        <PhilosophicalQuote className="mt-12 text-center" />
      </div>
    </div>
  )
}


