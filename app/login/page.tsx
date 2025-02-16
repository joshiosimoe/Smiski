"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PhilosophicalQuote } from "@/components/PhilosophicalQuote"
import { PhilosophicalSpinner } from "@/components/PhilosophicalSpinner"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    if (username && password) {
      localStorage.setItem("user", JSON.stringify({ username }))
      router.push("/dashboard")
    } else {
      alert("Please enter both username and password")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="relative bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-primary/5 rounded-lg filter blur-xl"></div>
        <form onSubmit={handleLogin} className="relative z-10 space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">Embark on Your Kerano Journey</h2>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="philosophical-input w-full"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="philosophical-input w-full"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="philosophical-button w-full" disabled={isLoading}>
            {isLoading ? <PhilosophicalSpinner /> : "Illuminate"}
          </button>
        </form>
        <PhilosophicalQuote className="mt-8 text-center" />
      </div>
    </div>
  )
}


