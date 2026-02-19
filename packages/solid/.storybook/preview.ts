import type { Preview } from "storybook-solidjs-vite"
import { createDecorator } from "storybook-solidjs-vite"
import "../src/index.css"

// Default themes from tweakcn
const DEFAULT_THEMES = [
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

interface ThemeRegistryItem {
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
function applyModeToDOM(mode: "light" | "dark") {
  const root = document.documentElement
  if (mode === "dark") {
    root.classList.add("dark")
    root.setAttribute("data-theme", "dark")
  } else {
    root.classList.remove("dark")
    root.setAttribute("data-theme", "light")
  }
}

// Fetch theme from URL
async function fetchThemeFromUrl(url: string): Promise<ThemeRegistryItem> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch theme: ${response.statusText}`)
  }
  return response.json()
}

// Save theme to localStorage
function saveThemeToStorage(themeId: string, mode: "light" | "dark") {
  localStorage.setItem(STORAGE_KEY, themeId)
  localStorage.setItem(MODE_STORAGE_KEY, mode)
}

// Get theme from localStorage
function getThemeFromStorage(): { themeId: string; mode: "light" | "dark" } {
  const themeId = localStorage.getItem(STORAGE_KEY) || "default"
  const mode = (localStorage.getItem(MODE_STORAGE_KEY) as "light" | "dark") || "light"
  return { themeId, mode }
}

// Save registry item to localStorage
function saveRegistryItem(themeId: string, registryItem: ThemeRegistryItem) {
  const stored = localStorage.getItem(REGISTRY_STORAGE_KEY)
  const registry = stored ? JSON.parse(stored) : {}
  registry[themeId] = registryItem
  localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(registry))
}

// Get registry item from localStorage
function getRegistryItem(themeId: string): ThemeRegistryItem | null {
  const stored = localStorage.getItem(REGISTRY_STORAGE_KEY)
  if (!stored) return null
  const registry = JSON.parse(stored)
  return registry[themeId] || null
}

// Load theme (from localStorage or fetch)
async function loadTheme(themeId: string): Promise<ThemeRegistryItem | null> {
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
  root.style.setProperty(`--${key}`, value)
}

// Apply theme from registry
async function applyThemeFromRegistry(registryItem: ThemeRegistryItem, mode: "light" | "dark") {
  const root = document.documentElement
  const { cssVars, css } = registryItem

  // Remove existing font variable override styles
  const existingFontStyle = document.querySelector('style[data-tweakcn-switcher-font-vars="true"]')
  if (existingFontStyle) {
    existingFontStyle.remove()
  }

  // Apply theme-level variables
  if (cssVars.theme) {
    Object.entries(cssVars.theme).forEach(([key, value]) => {
      applyCSSVariable(key, value, root)
      root.style.setProperty(`--${key}`, value, "important")

      if (isColorFunction(value) && isColorVariable(key)) {
        root.style.setProperty(`--color-${key}`, value, "important")
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

// Main function to apply theme synchronously (for cached themes)
function applyThemeSync(themeId: string, mode: "light" | "dark") {
  // Always apply mode first (synchronously)
  applyModeToDOM(mode)

  if (themeId === "default") {
    // Remove tweakcn styles
    const existing = document.querySelectorAll('style[data-tweakcn-switcher="true"]')
    existing.forEach((el: Element) => el.remove())
    const existingFontStyle = document.querySelector('style[data-tweakcn-switcher-font-vars="true"]')
    if (existingFontStyle) {
      existingFontStyle.remove()
    }
    return true
  }

  // Try to get from cache synchronously
  const cached = getRegistryItem(themeId)
  if (cached) {
    // Apply cached theme synchronously
    applyThemeFromRegistry(cached, mode)
    return true
  }

  // Not in cache, need to load async
  return false
}

// Main function to apply theme (async for loading)
async function applyThemeAsync(themeId: string, mode: "light" | "dark") {
  if (themeId === "default") {
    saveThemeToStorage(themeId, mode)
    return
  }

  // Check if already applied from cache
  const cached = getRegistryItem(themeId)
  if (cached) {
    saveThemeToStorage(themeId, mode)
    return
  }

  // Load from URL
  const registryItem = await loadTheme(themeId)
  if (registryItem) {
    await applyThemeFromRegistry(registryItem, mode)
  }

  saveThemeToStorage(themeId, mode)
}

// Parse globals from URL
function getGlobalsFromURL(): { theme?: string; mode?: string } {
  const urlParams = new URLSearchParams(window.location.search)
  const globalsParam = urlParams.get("globals")

  if (!globalsParam) return {}

  // Parse format: "theme:Catppuccin;mode:dark"
  const globals: { theme?: string; mode?: string } = {}
  const pairs = globalsParam.split(";")

  for (const pair of pairs) {
    const [key, value] = pair.split(":")
    if (key && value) {
      globals[key.trim() as keyof typeof globals] = value.trim()
    }
  }

  return globals
}

// Theme decorator using createDecorator (for non-JSX decorators)
const withTheme = createDecorator((Story, context) => {
  // First try to get from URL, then from context/globals
  const urlGlobals = getGlobalsFromURL()
  const theme = urlGlobals.theme || context.globals.theme || "default"
  const mode = (urlGlobals.mode || context.globals.mode || "light") as "light" | "dark"

  // Apply theme synchronously (for cached themes)
  const applied = applyThemeSync(theme, mode)

  // If not applied from cache, load async
  if (!applied) {
    applyThemeAsync(theme, mode)
  }

  return Story()
})

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: DEFAULT_THEMES.map((t) => ({
          value: t.id,
          title: t.name,
          icon: t.id === "default" ? "circlehollow" : "circle",
        })),
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Color mode",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "default",
    mode: "light",
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
