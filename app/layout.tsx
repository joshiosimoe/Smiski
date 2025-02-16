import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Transition } from "@/components/Transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kerano - Unravel Data, Reveal Wisdom",
  description: "Simplify your data sheets with Kerano",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Transition>{children}</Transition>
      </body>
    </html>
  )
}


