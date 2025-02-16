"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PhilosophicalQuote } from "@/components/PhilosophicalQuote"
import { PhilosophicalSpinner } from "@/components/PhilosophicalSpinner"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const endpoint = isLogin ? "/api/users/login" : "/api/users"
      const body = isLogin ? { email, password } : { username, email, password }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "An error occurred")
      }

      localStorage.setItem("user", JSON.stringify(data.user))
      router.push("/dashboard")
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="relative bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-primary/5 rounded-lg filter blur-xl"></div>
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">
            {isLogin ? "Embark on Your Kerano Journey" : "Join the Kerano Collective"}
          </h2>
          {error && <p className="text-destructive text-center">{error}</p>}
          {!isLogin && (
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
          )}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="philosophical-input w-full"
              placeholder="Email"
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
            {isLoading ? <PhilosophicalSpinner /> : isLogin ? "Illuminate" : "Materialize"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Haven't joined yet?" : "Already a member?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline focus:outline-none"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
        </form>
        <PhilosophicalQuote className="mt-8 text-center" />
      </div>
    </div>
  )
}


