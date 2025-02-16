"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { generateRandomColors } from "@/utils/colorCustomization"
import { PhilosophicalQuote } from "@/components/PhilosophicalQuote"
import { FloatingShapes } from "@/components/FloatingShapes"

interface User {
  username: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleRandomizeColors = () => {
    generateRandomColors()
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-background p-8 overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user.username}</h1>
          <div className="space-x-4">
            <button onClick={handleRandomizeColors} className="philosophical-button bg-accent text-accent-foreground">
              Shift Paradigm
            </button>
            <button onClick={handleLogout} className="philosophical-button bg-destructive text-destructive-foreground">
              Transcend
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/dashboard/submit"
            className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Distill Wisdom</h2>
            <p className="text-muted-foreground">Transmute raw data into crystallized insight</p>
          </Link>
          <Link
            href="/dashboard/history"
            className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Contemplate History</h2>
            <p className="text-muted-foreground">Reflect on the echoes of past revelations</p>
          </Link>
        </div>
        <PhilosophicalQuote className="mt-12 text-center" />
      </div>
    </div>
  )
}


