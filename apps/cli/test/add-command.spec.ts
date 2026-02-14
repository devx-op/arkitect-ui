import { describe, expect, it } from "@effect/vitest"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientResponse from "@effect/platform/HttpClientResponse"
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Path from "@effect/platform-node/NodePath"
import * as Command from "@effect/cli/Command"
import * as Console from "effect/Console"
import { addCommand } from "../src/commands/add.js"
import { initCommand } from "../src/commands/init.js"
import { withTempDir } from "./utils.js"

const MockHttpClient = Layer.succeed(
  HttpClient.HttpClient,
  HttpClient.make((request) => {
    if (request.url.includes("index.json")) {
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          new Response(
            JSON.stringify({
              items: [
                {
                  name: "button",
                  type: "registry:ui",
                  files: [{ path: "ui/button.tsx", type: "registry:ui" }],
                },
              ],
            }),
            { status: 200 },
          ),
        ),
      )
    }
    // Mock fetching component definition
    if (request.url.includes("button.json")) {
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          new Response(
            JSON.stringify({
              name: "button",
              type: "registry:ui",
              files: [
                {
                  path: "ui/button.tsx",
                  content: "export const Button = () => <button />",
                  type: "registry:ui",
                },
              ],
            }),
            { status: 200 },
          ),
        ),
      )
    }
    return Effect.fail(new Error(`Unexpected request: ${request.url}`))
  }),
)

describe("add command", () => {
  it.live("adds a component (dry run)", () =>
    withTempDir((dir) =>
      Effect.gen(function*() {
        const cli = Command.run(
          Command.make("cli").pipe(Command.withSubcommands([initCommand, addCommand])),
          { name: "test", version: "0.0.0" },
        )

        // Init first
        yield* cli(["node", "test", "init", "--cwd", dir, "--yes", "--install-deps=false"])

        // Add button with dry-run
        yield* cli(["node", "test", "add", "button", "--cwd", dir, "--dry-run"])

        const fs = yield* FileSystem.FileSystem
        const configExists = yield* fs.exists(`${dir}/components.json`)
        expect(configExists).toBe(true)
      }).pipe(
        Effect.provide(NodeFileSystem.layer),
        Effect.provide(Path.layer),
        Effect.provide(MockHttpClient),
      )
    ))
})
