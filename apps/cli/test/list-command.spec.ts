import { describe, expect, it, vi } from "@effect/vitest"
import * as Effect from "effect/Effect"
import * as Command from "@effect/cli/Command"
import { listCommand } from "../src/commands/list.js"
import * as NodeContext from "@effect/platform-node/NodeContext"

const mockRegistry = {
  items: [
    {
      name: "button",
      type: "registry:ui",
      title: "Button",
      description: "Button component",
      files: [],
    },
    {
      name: "card",
      type: "registry:ui",
      title: "Card",
      description: "Card component",
      files: [],
    },
    {
      name: "internal-tool",
      type: "registry:tool",
      title: "Internal Tool",
      description: "Non-UI item",
      files: [],
    },
  ],
}

describe("list command", () => {
  it.live("prints available UI components from registry", () =>
    Effect.gen(function*() {
      const originalFetch = globalThis.fetch
      globalThis.fetch = vi.fn(async () => {
        return new Response(JSON.stringify(mockRegistry), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }) as unknown as typeof fetch

      const logSpy = vi.spyOn(console, "log").mockImplementation(() => {})

      const run = Command.run(listCommand, {
        name: "arkitect-ui CLI",
        version: "0.1.0",
      })

      yield* run([]).pipe(Effect.provide(NodeContext.layer))

      expect(logSpy).toHaveBeenCalledWith("\nAvailable components:")
      expect(logSpy).toHaveBeenCalledWith("- button: Button component")
      expect(logSpy).toHaveBeenCalledWith("- card: Card component")

      logSpy.mockRestore()
      globalThis.fetch = originalFetch
    }))
})
