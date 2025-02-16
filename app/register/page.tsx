"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PhilosophicalQuote } from "@/components/PhilosophicalQuote"
import Link from "next/link"

export default function Register() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
      if (res.ok) {
        router.push("/login")
      } else {
        const data = await res.json()
        setError(data.error || "Registration failed")
      }
    } catch (error) {
      setError("An error occurred during registration")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="relative bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-primary/5 rounded-lg filter blur-xl"></div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">Join the Kerano Collective</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="philosophical-input w-full"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="philosophical-input w-full"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="philosophical-input w-full"
              required
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button type="submit" className="philosophical-button w-full">
              Register
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
          <PhilosophicalQuote className="mt-8 text-center" />
        </div>
      </div>
    </div>
  )
}


