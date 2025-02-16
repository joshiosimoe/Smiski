"use client"

import type React from "react"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { PhilosophicalQuote } from "@/components/PhilosophicalQuote"
import { PhilosophicalSpinner } from "@/components/PhilosophicalSpinner"
import Link from "next/link"

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  if (status === "loading") {
    return <PhilosophicalSpinner />
  }

  if (session) {
    router.push("/dashboard")
    return null
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })
    if (result?.error) {
      setError("Invalid email or password")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="relative bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-primary/5 rounded-lg filter blur-xl"></div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">Embark on Your Kerano Journey</h2>
          <button onClick={handleGoogleSignIn} className="philosophical-button w-full mb-4">
            Sign in with Google
          </button>
          <div className="text-center text-muted-foreground">or</div>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
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
              Sign in
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
          <PhilosophicalQuote className="mt-8 text-center" />
        </div>
      </div>
    </div>
  )
}


