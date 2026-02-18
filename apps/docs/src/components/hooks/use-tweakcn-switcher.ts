import { type RefObject, useCallback, useEffect, useState } from "react"
import type { ThemeOption, ThemeRegistryItem, TweakcnSwitcherConfig } from "@/lib/types"
import { applyThemeFromRegistry, extractThemeNameFromUrl, fetchThemeFromUrl } from "@/lib/utils"

export interface UseTweakcnSwitcherReturn {
  currentTheme: ThemeOption | null
  themes: ThemeOption[]
  isLoading: boolean
  error: string | null
  applyTheme: (url: string) => Promise<void>
  applyThemeOption: (theme: ThemeOption) => Promise<void>
  addTheme: (url: string, name?: string) => Promise<ThemeOption | null>
  removeTheme: (themeId: string) => void
  mode: "light" | "dark"
  setMode: (mode: "light" | "dark") => void
  toggleMode: () => Promise<void>
}

const DEFAULT_STORAGE_KEY = "tweakcn-switcher-theme"
const MODE_STORAGE_KEY = "tweakcn-switcher-mode"

export function useTweakcnSwitcher(
  config: TweakcnSwitcherConfig = {},
  buttonRef?: RefObject<HTMLElement | null>,
): UseTweakcnSwitcherReturn {
  const {
    defaultThemes = [],
    persist = true,
    storageKey = DEFAULT_STORAGE_KEY,
  } = config

  const [themes, setThemes] = useState<ThemeOption[]>(defaultThemes)
  const [currentTheme, setCurrentTheme] = useState<ThemeOption | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setModeState] = useState<"light" | "dark">("light")
  const [currentRegistryItem, setCurrentRegistryItem] = useState<ThemeRegistryItem | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Apply mode to DOM without animation (used for initialization)
  const applyModeToDOM = useCallback((newMode: "light" | "dark") => {
    if (typeof document === "undefined") return

    const root = document.documentElement
    const body = document.body

    if (newMode === "dark") {
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
  }, [])

  // Wrapper for setMode that also persists to localStorage and updates DOM
  const setMode = useCallback(
    (newMode: "light" | "dark") => {
      setModeState(newMode)

      // Persist mode separately
      if (persist && typeof localStorage !== "undefined") {
        localStorage.setItem(MODE_STORAGE_KEY, newMode)
      }

      // Apply mode to DOM immediately for responsiveness
      applyModeToDOM(newMode)
    },
    [persist, applyModeToDOM],
  )

  // Toggle mode with radial animation using View Transitions API
  const toggleMode = useCallback(async () => {
    const newMode = mode === "light" ? "dark" : "light"

    // Check if View Transitions API is supported
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> }
    }

    if (!doc.startViewTransition || typeof window === "undefined") {
      // Fallback: switch mode without animation
      setMode(newMode)
      return
    }

    // Get button position for radial animation origin
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    if (buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    // Calculate max radius to cover the entire screen
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    // Start view transition
    const transition = doc.startViewTransition(() => {
      setMode(newMode)
    })

    try {
      await transition.ready

      // Apply radial clip-path animation
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      )
    } catch (err) {
      // If animation fails, mode is already changed
      console.error("View transition animation failed:", err)
    }
  }, [mode, setMode, buttonRef])

  const applyTheme = useCallback(
    async (url: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const registryItem = await fetchThemeFromUrl(url)
        setCurrentRegistryItem(registryItem)
        await applyThemeFromRegistry(registryItem, mode)

        // Find or create theme option
        const themeName = registryItem.name || extractThemeNameFromUrl(url)
        const themeId = `theme-${themeName}`

        setThemes((prev) => {
          let themeOption = prev.find((t) => t.url === url)
          if (!themeOption) {
            themeOption = {
              id: themeId,
              name: themeName,
              url,
            }
            const updated = [...prev, themeOption]
            setCurrentTheme(themeOption)
            return updated
          }
          setCurrentTheme(themeOption)
          return prev
        })

        // Persist if enabled
        if (persist) {
          localStorage.setItem(
            storageKey,
            JSON.stringify({ url, mode, name: themeName }),
          )
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to apply theme"
        setError(errorMessage)
        console.error("Failed to apply theme:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [mode, persist, storageKey],
  )

  // Initialize from localStorage on mount
  useEffect(() => {
    if (!persist || typeof localStorage === "undefined") {
      setIsInitialized(true)
      return
    }

    // Load saved mode first
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY)
    if (savedMode === "dark" || savedMode === "light") {
      setModeState(savedMode)
      // Apply mode to DOM immediately
      applyModeToDOM(savedMode)
    }

    // Load saved theme
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const savedTheme = JSON.parse(saved)
        if (savedTheme.url) {
          // Apply theme after a short delay to ensure mode is set
          setTimeout(() => {
            applyTheme(savedTheme.url).catch(console.error)
          }, 0)
        }
      } catch (e) {
        console.error("Failed to load saved theme:", e)
      }
    }

    setIsInitialized(true)
  }, [persist, storageKey, applyTheme, applyModeToDOM])

  // Apply mode changes to current theme
  useEffect(() => {
    if (!isInitialized) return

    if (currentRegistryItem) {
      applyThemeFromRegistry(currentRegistryItem, mode).catch(console.error)
    }

    // Update persisted theme with new mode
    if (persist && currentTheme) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          url: currentTheme.url,
          mode,
          name: currentTheme.name,
        }),
      )
    }
  }, [
    mode,
    currentRegistryItem,
    isInitialized,
    persist,
    storageKey,
    currentTheme,
  ])

  const applyThemeOption = useCallback(
    async (theme: ThemeOption) => {
      await applyTheme(theme?.url || "")
    },
    [applyTheme],
  )

  const addTheme = useCallback(
    async (url: string, name?: string): Promise<ThemeOption | null> => {
      try {
        const registryItem = await fetchThemeFromUrl(url)
        const themeName = name || registryItem.name || extractThemeNameFromUrl(url)
        const themeId = `theme-${themeName}`

        const newTheme: ThemeOption = {
          id: themeId,
          name: themeName,
          url,
        }

        setThemes((prev) => {
          if (prev.some((t) => t.url === url)) {
            return prev
          }
          return [...prev, newTheme]
        })

        return newTheme
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to add theme"
        setError(errorMessage)
        throw err
      }
    },
    [],
  )

  const removeTheme = useCallback(
    (themeId: string) => {
      setThemes((prev) => prev.filter((t) => t.id !== themeId))
      if (currentTheme?.id === themeId) {
        setCurrentTheme(null)
        setCurrentRegistryItem(null)
        if (persist) {
          localStorage.removeItem(storageKey)
        }
      }
    },
    [currentTheme, persist, storageKey],
  )

  return {
    currentTheme,
    themes,
    isLoading,
    error,
    applyTheme,
    applyThemeOption,
    addTheme,
    removeTheme,
    mode,
    setMode,
    toggleMode,
  }
}
