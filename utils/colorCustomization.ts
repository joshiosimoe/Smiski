import { getCookie, setCookie } from "cookies-next"

interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

const colorPalettes: ColorPalette[] = [
  {
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#F59E0B",
    background: "#F3F4F6",
    text: "#1F2937",
  },
  {
    primary: "#6366F1",
    secondary: "#EC4899",
    accent: "#8B5CF6",
    background: "#F9FAFB",
    text: "#111827",
  },
  {
    primary: "#EF4444",
    secondary: "#F97316",
    accent: "#FBBF24",
    background: "#FFFBEB",
    text: "#1F2937",
  },
  {
    primary: "#14B8A6",
    secondary: "#06B6D4",
    accent: "#3B82F6",
    background: "#ECFEFF",
    text: "#0F172A",
  },
  {
    primary: "#8B5CF6",
    secondary: "#EC4899",
    accent: "#6366F1",
    background: "#1E1B4B",
    text: "#E0E7FF",
  },
  {
    primary: "#10B981",
    secondary: "#059669",
    accent: "#34D399",
    background: "#ECFDF5",
    text: "#064E3B",
  },
  {
    primary: "#6D28D9",
    secondary: "#4F46E5",
    accent: "#7C3AED",
    background: "#F5F3FF",
    text: "#1E1B4B",
  },
  {
    primary: "#DB2777",
    secondary: "#BE185D",
    accent: "#F472B6",
    background: "#FDF2F8",
    text: "#831843",
  },
  {
    primary: "#2563EB",
    secondary: "#1D4ED8",
    accent: "#60A5FA",
    background: "#1E3A8A",
    text: "#BFDBFE",
  },
  {
    primary: "#059669",
    secondary: "#047857",
    accent: "#34D399",
    background: "#022C22",
    text: "#D1FAE5",
  },
  {
    primary: "#7C3AED",
    secondary: "#6D28D9",
    accent: "#A78BFA",
    background: "#2E1065",
    text: "#EDE9FE",
  },
  {
    primary: "#DC2626",
    secondary: "#B91C1C",
    accent: "#F87171",
    background: "#7F1D1D",
    text: "#FEE2E2",
  },
  {
    primary: "#0284C7",
    secondary: "#0369A1",
    accent: "#38BDF8",
    background: "#F0F9FF",
    text: "#075985",
  },
  {
    primary: "#4338CA",
    secondary: "#3730A3",
    accent: "#818CF8",
    background: "#E0E7FF",
    text: "#1E1B4B",
  },
  {
    primary: "#0F766E",
    secondary: "#0D9488",
    accent: "#2DD4BF",
    background: "#134E4A",
    text: "#CCFBF1",
  },
]

export function generateAndApplyRandomColors(): void {
  console.log("Starting generateAndApplyRandomColors function")
  try {
    const cachedPaletteIndex = getCookie("color-palette-index")
    console.log("Cached palette index:", cachedPaletteIndex)

    let newIndex: number
    if (cachedPaletteIndex !== undefined) {
      // Ensure we select a different palette
      do {
        newIndex = Math.floor(Math.random() * colorPalettes.length)
      } while (newIndex === Number.parseInt(cachedPaletteIndex as string, 10))
    } else {
      newIndex = Math.floor(Math.random() * colorPalettes.length)
    }

    console.log("New palette index:", newIndex)
    const palette = colorPalettes[newIndex]
    console.log("Selected palette:", palette)

    setCookie("color-palette-index", newIndex.toString(), { maxAge: 3600 }) // Cache for 1 hour

    console.log("Applying color palette")
    applyColorPalette(palette)
  } catch (error) {
    console.error("Error in generateAndApplyRandomColors:", error)
    console.error("Error stack:", error.stack)
    // Fallback to a default palette
    console.log("Applying fallback palette")
    applyColorPalette(colorPalettes[0])
  }
}

function applyColorPalette(palette: ColorPalette): void {
  console.log("Starting applyColorPalette function with palette:", palette)
  const root = document.documentElement

  try {
    // Convert hex to HSL and apply
    Object.entries(palette).forEach(([key, value]) => {
      const hslValue = hexToHSL(value)
      console.log(`Setting ${key} to ${hslValue}`)
      root.style.setProperty(`--${key}`, hslValue)
    })

    // Derive other colors
    const derivedColors = {
      "primary-foreground": getContrastColor(palette.primary),
      "secondary-foreground": getContrastColor(palette.secondary),
      "accent-foreground": getContrastColor(palette.accent),
      muted: adjustBrightness(palette.background, -10),
      "muted-foreground": adjustBrightness(palette.text, 20),
    }

    Object.entries(derivedColors).forEach(([key, value]) => {
      const hslValue = hexToHSL(value)
      console.log(`Setting derived color ${key} to ${hslValue}`)
      root.style.setProperty(`--${key}`, hslValue)
    })

    console.log("Color palette applied successfully")
  } catch (error) {
    console.error("Error applying color palette:", error)
    console.error("Error stack:", error.stack)
  }
}

function hexToHSL(hex: string): string {
  console.log("Converting hex to HSL:", hex)
  try {
    // Remove the # if present
    hex = hex.replace("#", "")

    // Convert hex to RGB
    const r = Number.parseInt(hex.substring(0, 2), 16) / 255
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b)
    const cmax = Math.max(r, g, b)
    const delta = cmax - cmin

    let h = 0
    let s = 0
    let l = 0

    // Calculate hue
    if (delta === 0) h = 0
    else if (cmax === r) h = ((g - b) / delta) % 6
    else if (cmax === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)
    if (h < 0) h += 360

    // Calculate lightness
    l = (cmax + cmin) / 2

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // Convert to percentages
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    const hslValue = `${h} ${s}% ${l}%`
    console.log("Converted HSL value:", hslValue)
    return hslValue
  } catch (error) {
    console.error("Error converting hex to HSL:", error)
    console.error("Error stack:", error.stack)
    return "0 0% 0%" // Default to black if conversion fails
  }
}

function getContrastColor(hexColor: string): string {
  console.log("Getting contrast color for:", hexColor)
  try {
    const r = Number.parseInt(hexColor.slice(1, 3), 16)
    const g = Number.parseInt(hexColor.slice(3, 5), 16)
    const b = Number.parseInt(hexColor.slice(5, 7), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    const contrastColor = yiq >= 128 ? "#000000" : "#FFFFFF"
    console.log("Contrast color:", contrastColor)
    return contrastColor
  } catch (error) {
    console.error("Error calculating contrast color:", error)
    console.error("Error stack:", error.stack)
    return "#000000" // Default to black if calculation fails
  }
}

function adjustBrightness(hex: string, percent: number): string {
  console.log("Adjusting brightness for:", hex, "by", percent)
  try {
    const num = Number.parseInt(hex.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    const adjustedColor = `#${((1 << 24) | ((R < 255 ? (R < 1 ? 0 : R) : 255) << 16) | ((G < 255 ? (G < 1 ? 0 : G) : 255) << 8) | (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`
    console.log("Adjusted color:", adjustedColor)
    return adjustedColor
  } catch (error) {
    console.error("Error adjusting brightness:", error)
    console.error("Error stack:", error.stack)
    return hex // Return original color if adjustment fails
  }
}


