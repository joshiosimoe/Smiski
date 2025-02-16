"use client"

import type React from "react"

import { useEffect } from "react"
import { generateAndApplyRandomColors } from "@/utils/colorCustomization"

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    generateAndApplyRandomColors()
  }, [])

  return <>{children}</>
}


