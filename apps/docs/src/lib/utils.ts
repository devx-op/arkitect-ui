import type { ThemeRegistryCssVars, ThemeRegistryItem } from "./types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function applyCSSVariable(
  key: string,
  value: string,
  root: HTMLElement | null = typeof document !== "undefined"
    ? document.documentElement
    : null,
) {
  if (!root) return
  // Use setProperty for CSS custom properties - more reliable than manipulating style attribute
  root.style.setProperty(`--${key}`, value)
}

/**
 * Remove all font links added by tweakcn-switcher
 */
function removeFontLinks() {
  if (typeof document === "undefined") return
  const existing = document.querySelectorAll(
    'link[data-tweakcn-switcher-font="true"]',
  )
  existing.forEach((el: Element) => el.remove())
}

/**
 * Extract font family names from a font-family CSS value
 * Handles values like "Roboto, sans-serif" or '"Inter Variable", sans-serif'
 */
function extractFontNames(fontFamily: string): string[] {
  // Remove quotes and split by comma
  const fonts = fontFamily
    .split(",")
    .map((f) => f.trim().replace(/^["']|["']$/g, ""))
    .filter(
      (f) => f && !f.match(/^(sans-serif|serif|monospace| cursive|fantasy)$/i),
    )

  return fonts
}

/**
 * Try to load a font from Google Fonts
 * Returns the Google Fonts URL if successful, null otherwise
 */
function getGoogleFontsUrl(fontName: string): string | null {
  // Remove spaces and special characters for Google Fonts API
  const normalizedName = fontName
    .replace(/\s+/g, "+")
    .replace(/['"]/g, "")
    .trim()

  if (!normalizedName) {
    return null
  }

  // Google Fonts API URL
  return `https://fonts.googleapis.com/css2?family=${normalizedName}:wght@400;500;600;700&display=swap`
}

/**
 * Load a font from Google Fonts URL
 */
function loadGoogleFont(url: string): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    // Check if link already exists
    const existing = document.querySelector(`link[href="${url}"]`)
    if (existing) {
      resolve()
      return
    }

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = url
    link.setAttribute("data-tweakcn-switcher-font", "true")

    link.onload = () => resolve()
    link.onerror = () => {
      // Silently fail - let the dev handle it if needed
      resolve()
    }

    document.head.appendChild(link)
  })
}

/**
 * Check if a value is a color function (oklch, hsl, rgb, etc.)
 * This helps detect when we need to apply colors directly instead of through hsl(var())
 */
function isColorFunction(value: string): boolean {
  // Detects: oklch(), hsl(), rgb(), rgba(), lab(), lch(), hwb(), color()
  return /^(oklch|hsl|rgb|rgba|lab|lch|hwb|color)\(/i.test(value.trim())
}

/**
 * Check if a CSS variable key is a color variable
 */
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
    (colorKey) =>
      key === colorKey ||
      key.startsWith(`${colorKey}-`) ||
      key.endsWith(`-${colorKey}`),
  )
}

/**
 * Apply theme colors to Starlight CSS variables
 * Maps shadcn/tailwind variables to Starlight's --sl-color-* variables
 */
function applyThemeToStarlight(
  cssVars: {
    theme?: Record<string, string>
    light?: Record<string, string>
    dark?: Record<string, string>
  },
  root: HTMLElement,
  mode: "light" | "dark",
) {
  const modeVars = cssVars[mode] || {}
  const themeVars = cssVars.theme || {}

  // Combine theme-level and mode-specific variables
  // Mode-specific takes precedence
  const allVars = { ...themeVars, ...modeVars }

  // Helper to get color value
  const getColor = (key: string): string | undefined => {
    return allVars[key]
  }

  // Helper to ensure value is a valid CSS color
  const toCssColor = (key: string): string | undefined => {
    const value = getColor(key)
    if (!value) return undefined

    // If it's already a color function or hex, return as is
    if (isColorFunction(value) || value.startsWith("#")) {
      return value
    }

    // Otherwise, assume it's HSL channels (shadcn default) and wrap in hsl()
    // This fixes issues where Starlight expects a color value but gets "0 0% 100%"
    return `hsl(${value})`
  }

  // Core color mapping: shadcn -> Starlight
  const starlightMapping: Record<string, string | undefined> = {
    // Main backgrounds and text
    "--sl-color-bg": toCssColor("background"),
    "--sl-color-text": toCssColor("foreground"),
    "--sl-color-text-accent": toCssColor("primary"),
    "--sl-color-text-invert": toCssColor("primary-foreground"),

    // Accent colors
    "--sl-color-accent": toCssColor("primary"),
    "--sl-color-accent-high": toCssColor("primary"),
    "--sl-color-accent-low": toCssColor("secondary"),

    // UI backgrounds
    "--sl-color-bg-nav": toCssColor("card") || toCssColor("background"),
    "--sl-color-bg-sidebar": toCssColor("card") || toCssColor("background"),
    "--sl-color-bg-inline-code": toCssColor("muted"),
    "--sl-color-bg-accent": toCssColor("accent"),

    // Borders
    "--sl-color-hairline-light": toCssColor("border"),
    "--sl-color-hairline": toCssColor("border"),
    "--sl-color-hairline-shade": toCssColor("border"),
    "--sl-color-border-inline-code": toCssColor("border"),

    // Grayscale mapping (Starlight uses gray-1 for text/high-contrast and gray-6 for bg/low-contrast)
    // This mapping applies to BOTH Light and Dark modes:
    // - Light Mode: gray-1 -> foreground (Black), gray-6 -> background (White)
    // - Dark Mode: gray-1 -> foreground (White), gray-6 -> background (Black)
    "--sl-color-white": toCssColor("foreground"), // Always high contrast (Text)
    "--sl-color-gray-1": toCssColor("foreground"), // Main Text
    "--sl-color-gray-2": toCssColor("muted-foreground"), // Secondary Text
    "--sl-color-gray-3": toCssColor("muted-foreground"), // Tertiary Text (was border - too light for tabs/TOC)
    "--sl-color-gray-4": toCssColor("border"), // Quaternary Text/Borders (was muted - too light)
    "--sl-color-gray-5": toCssColor("muted"), // Surface / Card Backgrounds (was card)
    "--sl-color-gray-6": toCssColor("background"), // Main Background
    "--sl-color-gray-7": toCssColor("background"), // Deep Background
    "--sl-color-black": toCssColor("background"), // Always low contrast (Background)

    // Semantic colors (map to destructive/primary)
    "--sl-color-red": toCssColor("destructive"),
    "--sl-color-red-low": toCssColor("muted"),
    "--sl-color-red-high": toCssColor("destructive"),
    "--sl-color-blue": toCssColor("primary"),
    "--sl-color-blue-low": toCssColor("secondary"),
    "--sl-color-blue-high": toCssColor("primary"),
    "--sl-color-green": toCssColor("primary"),
    "--sl-color-green-low": toCssColor("secondary"),
    "--sl-color-green-high": toCssColor("primary"),
    "--sl-color-purple": toCssColor("accent"),
    "--sl-color-purple-low": toCssColor("muted"),
    "--sl-color-purple-high": toCssColor("accent"),
    "--sl-color-orange": toCssColor("primary"),
    "--sl-color-orange-low": toCssColor("secondary"),
    "--sl-color-orange-high": toCssColor("primary"),
  }

  // Apply all Starlight variables
  Object.entries(starlightMapping).forEach(([variable, value]) => {
    if (value) {
      root.style.setProperty(variable, value, "important")
    }
  })
}

/**
 * Try to load fonts from Google Fonts based on font-family value
 * This is best-effort - if it fails, the dev can handle it
 */
async function tryLoadFontsFromGoogleFonts(fontFamily: string): Promise<void> {
  if (typeof document === "undefined") {
    return
  }

  const fontNames = extractFontNames(fontFamily)

  if (fontNames.length === 0) {
    return
  }

  // Try to load each font from Google Fonts
  const loadPromises = fontNames.map((fontName) => {
    const googleFontsUrl = getGoogleFontsUrl(fontName)
    if (googleFontsUrl) {
      return loadGoogleFont(googleFontsUrl)
    }
    return Promise.resolve()
  })

  await Promise.all(loadPromises)
}

export async function applyThemeFromRegistry(
  registryItem: ThemeRegistryItem,
  mode: "light" | "dark" = "light",
) {
  if (typeof document === "undefined") {
    return
  }

  const root = document.documentElement
  const body = document.body
  const { cssVars, css } = registryItem

  // Remove existing font variable override styles
  const existingFontStyle = document.querySelector(
    'style[data-tweakcn-switcher-font-vars="true"]',
  )
  if (existingFontStyle) {
    existingFontStyle.remove()
  }

  // Apply theme-level variables (common to both light and dark) with higher specificity
  let fontSansValue: string | null = null
  if (cssVars.theme) {
    Object.entries(cssVars.theme).forEach(([key, value]) => {
      // Apply to both :root and html for maximum compatibility
      applyCSSVariable(key, value, root)
      // Also apply directly to style attribute for higher specificity
      root.style.setProperty(`--${key}`, value, "important")

      // Check if this is a color variable with a color function value
      // This handles themes from tweakcn.com that use oklch() instead of HSL
      if (isColorFunction(value) && isColorVariable(key)) {
        // Apply color directly to the CSS variable that Tailwind uses
        root.style.setProperty(`--color-${key}`, value, "important")
      }

      // Track font-sans value for special handling
      if (key === "font-sans" && value) {
        fontSansValue = value
      }
    })
  }

  // Try to load fonts from Google Fonts if font-sans is set
  if (fontSansValue) {
    // Try to load from Google Fonts (best-effort, fails silently)
    await tryLoadFontsFromGoogleFonts(fontSansValue).catch(() => {
      // Silently fail - let the dev handle font loading if needed
    })

    // Inject a style with maximum specificity to override Starlight and Tailwind
    const fontStyle = document.createElement("style")
    fontStyle.setAttribute("data-tweakcn-switcher-font-vars", "true")
    // Escape any quotes in the font value for CSS
    const escapedFontValue = (fontSansValue as string).replace(/"/g, '\\"')
    fontStyle.textContent = `
      html, html[data-theme], html[data-theme="light"], html[data-theme="dark"] {
        --font-sans: ${escapedFontValue} !important;
        font-family: ${escapedFontValue} !important;
      }
      html *, html[data-theme] *, html[data-theme="light"] *, html[data-theme="dark"] * {
        font-family: inherit !important;
      }
    `
    document.head.appendChild(fontStyle)
  } else {
    // If no font-sans in theme, remove any inline font-family styles we may have set
    removeFontLinks()
    root.style.removeProperty("font-family")
    if (body) {
      body.style.removeProperty("font-family")
    }
  }

  // Apply mode-specific variables (excluding theme-level variables) with !important
  const modeVars = cssVars[mode]
  if (modeVars) {
    Object.entries(modeVars).forEach(([key, value]) => {
      // Skip theme-level variables (radius, font-*, shadow, tracking-*, spacing)
      // These should only come from cssVars.theme
      if (
        !key.startsWith("font-") &&
        !key.startsWith("radius") &&
        !key.startsWith("shadow") &&
        !key.startsWith("tracking-") &&
        !key.startsWith("spacing")
      ) {
        // Check if this is a color variable with a color function value
        // This handles themes from tweakcn.com that use oklch() instead of HSL
        if (isColorFunction(value) && isColorVariable(key)) {
          // Apply color directly to the CSS variable that Tailwind uses
          // e.g., --color-background instead of just --background
          // This bypasses the hsl(var(--background)) issue
          root.style.setProperty(`--color-${key}`, value, "important")
        }
        // Always apply the original variable as well for compatibility
        root.style.setProperty(`--${key}`, value, "important")
      }
    })
  }

  // Apply theme colors to Starlight components
  applyThemeToStarlight(cssVars, root, mode)

  // Apply CSS layer base styles if present with higher specificity
  if (css?.["@layer base"]) {
    // Remove existing style elements
    const existing = document.querySelectorAll(
      'style[data-tweakcn-switcher="true"]',
    )
    existing.forEach((el: Element) => el.remove())

    const baseStyles = css["@layer base"]
    const styleElement = document.createElement("style")
    styleElement.setAttribute("data-tweakcn-switcher", "true")

    // Combine all selectors into one style element with higher specificity
    const styleContent = Object.entries(baseStyles)
      .map(([selector, styles]) => {
        const props = Object.entries(styles)
          .map(([prop, val]) => `${prop}: ${val} !important;`)
          .join(" ")
        // Use html prefix for higher specificity
        const enhancedSelector = selector === ":root"
          ? 'html, html[data-theme], html[data-theme="light"], html[data-theme="dark"]'
          : `html ${selector}, html[data-theme] ${selector}`
        return `${enhancedSelector} { ${props} }`
      })
      .join("\n")

    styleElement.textContent = `@layer base {
${styleContent}
}`
    document.head.appendChild(styleElement)
  }

  // Handle dark mode class and data attribute
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

export async function fetchThemeFromUrl(
  url: string,
): Promise<ThemeRegistryItem> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch theme: ${response.statusText}`)
  }
  const data = await response.json()
  return data as ThemeRegistryItem
}

export function extractThemeNameFromUrl(url: string): string {
  const match = url.match(/\/([^/]+)\.json$/)
  return match && match[1] ? match[1] : "custom-theme"
}

/**
 * Parses CSS code and converts it to a ThemeRegistryItem
 * Supports :root, .dark, and @theme inline selectors
 */
export function parseCssToThemeRegistryItem(
  css: string,
  name: string = "custom-css-theme",
): ThemeRegistryItem {
  const cssVars: ThemeRegistryCssVars = {
    theme: {},
    light: {},
    dark: {},
  }

  // Remove comments
  const cleanedCss = css.replace(/\/\*[\s\S]*?\*\//g, "")

  // Parse :root selector (light mode variables)
  const rootMatch = cleanedCss.match(/:root\s*\{([^}]+)\}/)
  if (rootMatch && rootMatch[1]) {
    const rootContent = rootMatch[1]
    const varMatches = rootContent.matchAll(/--([^:]+):\s*([^;]+);/g)
    for (const match of varMatches) {
      if (match[1] && match[2]) {
        const key = match[1].trim()
        const value = match[2].trim()
        // Determine if it's a theme-level variable or light mode variable
        // Theme-level variables are things like --radius, --font-*, --shadow-*, etc.
        if (
          key.startsWith("font-") ||
          key.startsWith("radius") ||
          key.startsWith("shadow") ||
          key.startsWith("tracking-") ||
          key.startsWith("spacing")
        ) {
          cssVars.theme![key] = value
        } else {
          cssVars.light![key] = value
        }
      }
    }
  }

  // Parse .dark selector (dark mode variables)
  const darkMatch = cleanedCss.match(/\.dark\s*\{([^}]+)\}/)
  if (darkMatch && darkMatch[1]) {
    const darkContent = darkMatch[1]
    const varMatches = darkContent.matchAll(/--([^:]+):\s*([^;]+);/g)
    for (const match of varMatches) {
      if (match[1] && match[2]) {
        const key = match[1].trim()
        const value = match[2].trim()
        // Dark mode variables (excluding theme-level ones)
        if (
          !key.startsWith("font-") &&
          !key.startsWith("radius") &&
          !key.startsWith("shadow") &&
          !key.startsWith("tracking-") &&
          !key.startsWith("spacing")
        ) {
          cssVars.dark![key] = value
        }
      }
    }
  }

  // Parse @theme inline block if present
  const themeInlineMatch = cleanedCss.match(/@theme\s+inline\s*\{([^}]+)\}/)
  const cssLayerBase: Record<string, Record<string, string>> = {}
  if (themeInlineMatch && themeInlineMatch[1]) {
    const themeContent = themeInlineMatch[1]
    const varMatches = themeContent.matchAll(/--([^:]+):\s*([^;]+);/g)
    for (const match of varMatches) {
      if (match[1] && match[2]) {
        const key = match[1].trim()
        const value = match[2].trim()
        // Check if it's a theme-level variable (radius, font, shadow, etc.)
        if (
          key.startsWith("font-") ||
          key.startsWith("radius") ||
          key.startsWith("shadow") ||
          key.startsWith("tracking-") ||
          key.startsWith("spacing")
        ) {
          // Add to theme-level variables
          cssVars.theme![key] = value
        } else {
          // These are typically color mappings, add to :root in @layer base
          if (!cssLayerBase[":root"]) {
            cssLayerBase[":root"] = {}
          }
          cssLayerBase[":root"][`--${key}`] = value
        }
      }
    }
  }

  return {
    name,
    type: "theme",
    cssVars,
    ...(Object.keys(cssLayerBase).length > 0 && {
      css: {
        "@layer base": cssLayerBase,
      },
    }),
  }
}

/**
 * Checks if a string is likely CSS code (contains CSS selectors or properties)
 */
export function isCssCode(input: string): boolean {
  const trimmed = input.trim()
  // If it's a valid URL, it's not CSS
  try {
    new URL(trimmed)
    return false
  } catch {
    // Not a valid URL, check for CSS indicators
    return (
      trimmed.includes(":root") ||
      trimmed.includes(".dark") ||
      trimmed.includes("@theme") ||
      trimmed.includes("--") ||
      (trimmed.includes("{") && trimmed.includes("}") && trimmed.includes(":"))
    )
  }
}
