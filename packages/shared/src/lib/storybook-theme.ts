// Default themes from tweakcn
export const DEFAULT_THEMES = [
  {
    id: "default",
    name: "Default",
    url: "",
  },
  {
    id: "Catppuccin",
    name: "Catppuccin",
    url: "https://tweakcn.com/r/themes/catppuccin.json",
  },
  {
    id: "Claude",
    name: "Claude",
    url: "https://tweakcn.com/r/themes/claude.json",
  },
  {
    id: "darkmatter",
    name: "Darkmatter",
    url: "https://tweakcn.com/r/themes/darkmatter.json",
  },
  {
    id: "Mono",
    name: "Mono",
    url: "https://tweakcn.com/r/themes/mono.json",
  },
]

const STORAGE_KEY = "storybook-theme"
const MODE_STORAGE_KEY = "storybook-theme-mode"
const REGISTRY_STORAGE_KEY = "storybook-theme-registry"

// Types
export interface ThemeOption {
  id: string
  name: string
  url: string
}

export interface ThemeRegistryItem {
  name: string
  type: string
  cssVars: {
    theme?: Record<string, string>
    light: Record<string, string>
    dark: Record<string, string>
  }
  css?: {
    "@layer base"?: Record<string, Record<string, string>>
  }
}

// Helper function to apply mode to DOM
export function applyModeToDOM(mode: "light" | "dark") {
  const root = document.documentElement
  const body = document.body

  if (mode === "dark") {
    root.classList.add("dark")
    root.setAttribute("data-theme", "dark")
    if (body) {
      body.classList.add("dark")
      body.setAttribute("data-theme", "dark")
    }
  } else {
    root.classList.remove("dark")
    root.setAttribute("data-theme", "light")
    if (body) {
      body.classList.remove("dark")
      body.setAttribute("data-theme", "light")
    }
  }
}

// Fetch theme from URL
export async function fetchThemeFromUrl(url: string): Promise<ThemeRegistryItem> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch theme: ${response.statusText}`)
  }
  return response.json()
}

// Save theme to localStorage
export function saveThemeToStorage(themeId: string, mode: "light" | "dark") {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, themeId)
    localStorage.setItem(MODE_STORAGE_KEY, mode)
  }
}

// Get theme from localStorage
export function getThemeFromStorage(): { themeId: string; mode: "light" | "dark" } {
  if (typeof localStorage === "undefined") {
    return { themeId: "default", mode: "light" }
  }

  const themeId = localStorage.getItem(STORAGE_KEY) || "default"
  const mode = (localStorage.getItem(MODE_STORAGE_KEY) as "light" | "dark") || "light"
  return { themeId, mode }
}

// Save registry item to localStorage
export function saveRegistryItem(themeId: string, registryItem: ThemeRegistryItem) {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(REGISTRY_STORAGE_KEY)
    const registry = stored ? JSON.parse(stored) : {}
    registry[themeId] = registryItem
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(registry))
  }
}

// Get registry item from localStorage
export function getRegistryItem(themeId: string): ThemeRegistryItem | null {
  if (typeof localStorage === "undefined") return null

  const stored = localStorage.getItem(REGISTRY_STORAGE_KEY)
  if (!stored) return null

  const registry = JSON.parse(stored)
  return registry[themeId] || null
}

// Load theme (from localStorage or fetch)
export async function loadTheme(themeId: string): Promise<ThemeRegistryItem | null> {
  if (themeId === "default") return null

  // Try to get from localStorage first
  const cached = getRegistryItem(themeId)
  if (cached) return cached

  // Find theme URL
  const theme = DEFAULT_THEMES.find((t) => t.id === themeId)
  if (!theme || !theme.url) return null

  // Fetch from URL
  try {
    const registryItem = await fetchThemeFromUrl(theme.url)
    saveRegistryItem(themeId, registryItem)
    return registryItem
  } catch (error) {
    console.error("Failed to load theme:", error)
    return null
  }
}

// Check if value is a color function
function isColorFunction(value: string): boolean {
  return /^(oklch|hsl|rgb|rgba|lab|lch|hwb|color)\(/i.test(value.trim())
}

// Check if key is a color variable
function isColorVariable(key: string): boolean {
  const colorKeys = [
    "background",
    "foreground",
    "primary",
    "secondary",
    "muted",
    "accent",
    "destructive",
    "popover",
    "card",
    "border",
    "input",
    "ring",
  ]
  return colorKeys.some(
    (colorKey) => key === colorKey || key.startsWith(`${colorKey}-`) || key.endsWith(`-${colorKey}`),
  )
}

// Apply CSS variable
function applyCSSVariable(key: string, value: string, root: HTMLElement) {
  if (!root) return
  root.style.setProperty(`--${key}`, value)
}

// Apply theme from registry
export async function applyThemeFromRegistry(
  registryItem: ThemeRegistryItem,
  mode: "light" | "dark",
) {
  if (typeof document === "undefined") return

  const root = document.documentElement
  const body = document.body
  const { cssVars, css } = registryItem

  // Remove existing font variable override styles
  const existingFontStyle = document.querySelector('style[data-tweakcn-switcher-font-vars="true"]')
  if (existingFontStyle) {
    existingFontStyle.remove()
  }

  // Apply theme-level variables
  let fontSansValue: string | null = null
  if (cssVars.theme) {
    Object.entries(cssVars.theme).forEach(([key, value]) => {
      applyCSSVariable(key, value, root)
      root.style.setProperty(`--${key}`, value, "important")

      if (isColorFunction(value) && isColorVariable(key)) {
        root.style.setProperty(`--color-${key}`, value, "important")
      }

      if (key === "font-sans" && value) {
        fontSansValue = value
      }
    })
  }

  // Apply mode-specific variables
  const modeVars = cssVars[mode]
  if (modeVars) {
    Object.entries(modeVars).forEach(([key, value]) => {
      if (
        !key.startsWith("font-") &&
        !key.startsWith("radius") &&
        !key.startsWith("shadow") &&
        !key.startsWith("tracking-") &&
        !key.startsWith("spacing")
      ) {
        if (isColorFunction(value) && isColorVariable(key)) {
          root.style.setProperty(`--color-${key}`, value, "important")
        }
        root.style.setProperty(`--${key}`, value, "important")
      }
    })
  }

  // Apply CSS layer base styles if present
  if (css?.["@layer base"]) {
    const existing = document.querySelectorAll('style[data-tweakcn-switcher="true"]')
    existing.forEach((el: Element) => el.remove())

    const baseStyles = css["@layer base"]
    const styleElement = document.createElement("style")
    styleElement.setAttribute("data-tweakcn-switcher", "true")

    const styleContent = Object.entries(baseStyles)
      .map(([selector, styles]) => {
        const props = Object.entries(styles)
          .map(([prop, val]) => `${prop}: ${val} !important;`)
          .join(" ")
        const enhancedSelector = selector === ":root"
          ? 'html, html[data-theme], html[data-theme="light"], html[data-theme="dark"]'
          : `html ${selector}, html[data-theme] ${selector}`
        return `${enhancedSelector} { ${props} }`
      })
      .join("\n")

    styleElement.textContent = `@layer base {\n${styleContent}\n}`
    document.head.appendChild(styleElement)
  }

  // Apply mode class and data attribute
  applyModeToDOM(mode)
}

// Main function to apply theme
export async function applyTheme(themeId: string, mode: "light" | "dark") {
  if (themeId === "default") {
    // Remove tweakcn styles
    const existing = document.querySelectorAll('style[data-tweakcn-switcher="true"]')
    existing.forEach((el: Element) => el.remove())
    const existingFontStyle = document.querySelector('style[data-tweakcn-switcher-font-vars="true"]')
    if (existingFontStyle) {
      existingFontStyle.remove()
    }
    // Just apply mode
    applyModeToDOM(mode)
  } else {
    const registryItem = await loadTheme(themeId)
    if (registryItem) {
      await applyThemeFromRegistry(registryItem, mode)
    } else {
      // Fallback to default
      applyModeToDOM(mode)
    }
  }

  // Save to storage
  saveThemeToStorage(themeId, mode)
}
