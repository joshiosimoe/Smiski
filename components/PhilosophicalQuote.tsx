"use client"

import { useState, useEffect } from "react"

const quotes = [
  "The only true wisdom is in knowing you know nothing. - Socrates",
  "The unexamined life is not worth living. - Socrates",
  "I think, therefore I am. - René Descartes",
  "He who has a why to live can bear almost any how. - Friedrich Nietzsche",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
]

export function PhilosophicalQuote({ className = "" }: { className?: string }) {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return <div className={`italic text-foreground/70 ${className}`}>"{quote}"</div>
}


