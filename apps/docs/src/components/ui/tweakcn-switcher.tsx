import { IconLoader2, IconMoon, IconPalette, IconPlus, IconSun, IconX } from "@tabler/icons-solidjs"
import { Button } from "./button"
import { Input } from "./input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { createTweakcnSwitcher } from "../hooks/use-tweakcn-switcher"
import type { TweakcnSwitcherConfig } from "@/lib/types"
import { cn } from "@/lib/utils"
import { createSignal, splitProps } from "solid-js"

export interface TweakcnSwitcherProps extends TweakcnSwitcherConfig {
  class?: string
}

export function TweakcnSwitcher(props: TweakcnSwitcherProps) {
  const [local, config] = splitProps(props, ["class"])

  let modeButtonRef: HTMLButtonElement | undefined

  const {
    currentTheme,
    themes,
    isLoading,
    error,
    applyThemeOption,
    addTheme,
    removeTheme,
    mode,
    toggleMode,
  } = createTweakcnSwitcher(config, () => modeButtonRef)

  const [urlInput, setUrlInput] = createSignal("")
  const [isAddingTheme, setIsAddingTheme] = createSignal(false)
  const [showUrlInput, setShowUrlInput] = createSignal(false)

  const handleAddTheme = async () => {
    const input = urlInput().trim()
    if (!input) return

    setIsAddingTheme(true)
    try {
      const newTheme = await addTheme(input)
      if (newTheme !== null) {
        await applyThemeOption(newTheme)
      }
      setUrlInput("")
      setShowUrlInput(false)
    } catch (err) {
      console.error("Failed to add theme:", err)
    } finally {
      setIsAddingTheme(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTheme()
    } else if (e.key === "Escape") {
      setShowUrlInput(false)
      setUrlInput("")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        class={cn("relative", local.class)}
        aria-label="Switch theme"
      >
        <Button
          variant="outline"
          size="icon"
          class="relative"
          aria-label="Switch theme"
        >
          <IconPalette class="size-4" />
          {currentTheme() != null && <span class="absolute -top-1 -right-1 size-2 bg-primary rounded-full" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel class="flex items-center justify-between">
            <span>Themes</span>
            <div class="flex items-center gap-1">
              <Button
                ref={(el) => {
                  modeButtonRef = el
                }}
                variant="ghost"
                size="icon"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation()
                  toggleMode()
                }}
                class="h-6 w-6"
                aria-label={`Switch to ${mode() === "light" ? "dark" : "light"} mode`}
              >
                {mode() === "light" ? <IconMoon class="size-3" /> : <IconSun class="size-3" />}
              </Button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {error() && <div class="px-2 py-1.5 text-xs text-destructive">{error()}</div>}

          {showUrlInput() ?
            (
              <div class="px-2 py-1.5 space-y-2">
                <Input
                  placeholder="https://tweakcn.com/r/themes/..."
                  value={urlInput()}
                  onInput={(e) => setUrlInput(e.currentTarget.value)}
                  onKeyDown={handleKeyDown}
                  class="h-7 text-xs"
                  autofocus
                />
                <div class="flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddTheme}
                    disabled={isAddingTheme() || !urlInput().trim()}
                    class="flex-1 h-6"
                  >
                    {isAddingTheme() ? <IconLoader2 class="size-3 animate-spin" /> : <IconPlus class="size-3" />}
                    Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowUrlInput(false)
                      setUrlInput("")
                    }}
                    class="h-6"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) :
            (
              <>
                {themes().length > 0 ?
                  (
                    <DropdownMenuRadioGroup
                      value={currentTheme()?.id}
                      onValueChange={(value) => {
                        const theme = themes().find((t) => t.id === value.value)
                        if (theme) {
                          applyThemeOption(theme)
                        }
                      }}
                    >
                      {themes().map((theme) => (
                        <DropdownMenuRadioItem
                          value={theme.id}
                          class="flex items-center justify-between group"
                        >
                          <span class="truncate flex-1">{theme.name}</span>
                          {themes().length >
                              (config.defaultThemes?.length || 0) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e: MouseEvent) => {
                                e.stopPropagation()
                                removeTheme(theme.id)
                              }}
                              class="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label={`Remove ${theme.name}`}
                            >
                              <IconX class="size-3" />
                            </Button>
                          )}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  ) :
                  (
                    <div class="px-2 py-4 text-xs text-muted-foreground text-center">
                      No themes available
                    </div>
                  )}
              </>
            )}

          {isLoading() && (
            <div class="px-2 py-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <IconLoader2 class="size-3 animate-spin" />
              Loading theme...
            </div>
          )}
        </DropdownMenuGroup>

        {!showUrlInput() && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              value="add-theme"
              onClick={() => setShowUrlInput(true)}
              class="cursor-pointer"
            >
              <IconPlus class="size-4 mr-2" />
              Add theme from URL
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
