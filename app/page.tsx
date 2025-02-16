import Link from "next/link"
import { FloatingShapes } from "@/components/FloatingShapes"
import { PhilosophicalQuote } from "@/components/PhilosophicalQuote"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/20 to-background">
      <FloatingShapes />
      <div className="absolute inset-0 bg-[url('/curve-bg.svg')] bg-no-repeat bg-bottom bg-contain z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-primary">Welcome to Kerano</h1>
        <p className="text-xl mb-8 text-foreground/80">
          Unravel the complexity of data, reveal the simplicity of wisdom
        </p>
        <Link
          href="/login"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
        >
          Begin Your Journey
        </Link>
        <PhilosophicalQuote className="mt-12 max-w-md" />
      </div>
    </div>
  )
}


