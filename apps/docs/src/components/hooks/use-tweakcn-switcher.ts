import { createEffect, createSignal, onMount } from "solid-js"
import type { ThemeOption, ThemeRegistryItem, TweakcnSwitcherConfig } from "@/lib/types"
import { applyThemeFromRegistry, extractThemeNameFromUrl, fetchThemeFromUrl } from "@/lib/utils"

export interface TweakcnSwitcherReturn {
  currentTheme: () => ThemeOption | null
  themes: () => ThemeOption[]
  isLoading: () => boolean
  error: () => string | null
  applyTheme: (url: string) => Promise<void>
  applyThemeOption: (theme: ThemeOption) => Promise<void>
  addTheme: (url: string, name?: string) => Promise<ThemeOption | null>
  removeTheme: (themeId: string) => void
  mode: () => "light" | "dark"
  setMode: (mode: "light" | "dark") => void
  toggleMode: () => Promise<void>
}

const DEFAULT_STORAGE_KEY = "tweakcn-switcher-theme"
const MODE_STORAGE_KEY = "tweakcn-switcher-mode"

export function createTweakcnSwitcher(
  config: TweakcnSwitcherConfig = {},
  buttonRef?: HTMLElement | (() => HTMLElement | undefined),
): TweakcnSwitcherReturn {
  const {
    defaultThemes = [],
    persist = true,
    storageKey = DEFAULT_STORAGE_KEY,
  } = config

  const [themes, setThemes] = createSignal<ThemeOption[]>(defaultThemes)
  const [currentTheme, setCurrentTheme] = createSignal<ThemeOption | null>(
    null,
  )
  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)
  const [mode, setModeState] = createSignal<"light" | "dark">("light")
  const [currentRegistryItem, setCurrentRegistryItem] = createSignal<ThemeRegistryItem | null>(null)
  const [isInitialized, setIsInitialized] = createSignal(false)

  // Apply mode to DOM without animation (used for initialization)
  const applyModeToDOM = (newMode: "light" | "dark") => {
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
  }

  // Wrapper for setMode that also persists to localStorage and updates DOM
  const setMode = (newMode: "light" | "dark") => {
    setModeState(newMode)

    // Persist mode separately
    if (persist && typeof localStorage !== "undefined") {
      localStorage.setItem(MODE_STORAGE_KEY, newMode)
    }

    // Apply mode to DOM immediately for responsiveness
    applyModeToDOM(newMode)
  }

  // Toggle mode with radial animation using View Transitions API
  const toggleMode = async () => {
    const newMode = mode() === "light" ? "dark" : "light"

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

    const ref = typeof buttonRef === "function" ? buttonRef() : buttonRef
    if (ref) {
      const rect = ref.getBoundingClientRect()
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
  }

  const applyTheme = async (url: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const registryItem = await fetchThemeFromUrl(url)
      setCurrentRegistryItem(registryItem)
      await applyThemeFromRegistry(registryItem, mode())

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
          JSON.stringify({ url, mode: mode(), name: themeName }),
        )
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to apply theme"
      setError(errorMessage)
      console.error("Failed to apply theme:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize from localStorage on mount
  onMount(() => {
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
          // Check if tweakcn styles already exist in the DOM (e.g. preserved
          // across view-transition swaps by the before-swap persistence script).
          // If they do we only need to sync Solid state and cache the registry
          // item for future mode toggles — no need to re-apply CSS or re-fetch.
          const existingStyles = document.querySelector(
            'style[data-tweakcn-switcher="true"]',
          )
          const existingInlineVars = document.documentElement.getAttribute("style")
          const stylesAlreadyApplied = !!(
            existingStyles ||
            (existingInlineVars && existingInlineVars.includes("--"))
          )

          if (stylesAlreadyApplied) {
            // Sync Solid state with the already-applied theme
            const themeName = savedTheme.name ||
              savedTheme.url.match(/\/([^/]+)\.json$/)?.[1] ||
              "custom-theme"
            const themeId = `theme-${themeName}`
            const currentThemes = themes()
            const themeOption = currentThemes.find(
              (t) => t.url === savedTheme.url,
            ) || { id: themeId, name: themeName, url: savedTheme.url }

            setCurrentTheme(themeOption)
            setThemes((prev) => {
              if (prev.some((t) => t.url === savedTheme.url)) return prev
              return [...prev, themeOption]
            })

            // Fetch registry item in background for mode toggle support
            fetchThemeFromUrl(savedTheme.url)
              .then((item) => setCurrentRegistryItem(item))
              .catch(console.error)
          } else {
            // No persisted styles — apply theme from scratch
            applyTheme(savedTheme.url).catch(console.error)
          }
        }
      } catch (e) {
        console.error("Failed to load saved theme:", e)
      }
    }

    setIsInitialized(true)
  })

  // Apply mode changes to current theme
  createEffect(() => {
    if (!isInitialized()) return

    const registryItem = currentRegistryItem()
    if (registryItem) {
      applyThemeFromRegistry(registryItem, mode()).catch(console.error)
    }

    // Update persisted theme with new mode
    const current = currentTheme()
    if (persist && current) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          url: current.url,
          mode: mode(),
          name: current.name,
        }),
      )
    }
  })

  // Emit custom event when theme or mode changes
  createEffect(() => {
    if (!isInitialized()) return

    const current = currentTheme()
    const event = new CustomEvent("tweakcn-theme-change", {
      detail: {
        theme: current?.id || "default",
        mode: mode(),
        themeName: current?.name || "Default",
      },
    })
    window.dispatchEvent(event)
  })

  const applyThemeOption = async (theme: ThemeOption) => {
    await applyTheme(theme?.url || "")
  }

  const addTheme = async (
    url: string,
    name?: string,
  ): Promise<ThemeOption | null> => {
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
  }

  const removeTheme = (themeId: string) => {
    setThemes((prev) => prev.filter((t) => t.id !== themeId))
    const current = currentTheme()
    if (current?.id === themeId) {
      setCurrentTheme(null)
      setCurrentRegistryItem(null)
      if (persist) {
        localStorage.removeItem(storageKey)
      }
    }
  }

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
