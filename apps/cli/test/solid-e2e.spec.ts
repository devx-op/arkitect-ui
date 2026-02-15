import { describe, expect, it } from "@effect/vitest"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Stream from "effect/Stream"
import * as Sink from "effect/Sink"
import * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientResponse from "@effect/platform/HttpClientResponse"
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem"
import * as NodePath from "@effect/platform-node/NodePath"
import * as NodeTerminal from "@effect/platform-node/NodeTerminal"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Command from "@effect/cli/Command"
import * as CommandExecutor from "@effect/platform/CommandExecutor"
import { addCommand } from "../src/commands/add.js"
import { initCommand } from "../src/commands/init.js"
import { withTempDir } from "./utils.js"

const MockHttpClient = Layer.succeed(
  HttpClient.HttpClient,
  HttpClient.make((request) => {
    // Registry Index
    if (request.url.includes("index.json")) {
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response(
            JSON.stringify({
              items: [
                {
                  name: "s/button",
                  type: "registry:ui",
                  files: [
                    { path: "ui/button.tsx", type: "registry:ui" },
                    { path: "lib/utils.ts", type: "registry:ui" },
                  ],
                },
              ],
            }),
            { status: 200 },
          ),
        ),
      )
    }
    // Component definition
    if (request.url.includes("button.json")) {
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response(
            JSON.stringify({
              name: "s/button",
              type: "registry:ui",
              dependencies: ["solid-js", "@ark-ui/solid"],
              files: [
                {
                  path: "ui/button.tsx",
                  content: "export const Button = () => <button />",
                  type: "registry:ui",
                },
                {
                  path: "lib/utils.ts",
                  content: "export const cn = () => {}",
                  type: "registry:ui",
                },
              ],
            }),
            { status: 200 },
          ),
        ),
      )
    }
    return Effect.die(new Error(`Unexpected request: ${request.url}`))
  }),
)

const MockCommandExecutor = Layer.succeed(CommandExecutor.CommandExecutor, {
  start: (_cmd: any) =>
    Effect.succeed({
      pid: 1234,
      exitCode: Effect.succeed(0 as const),
      isRunning: Effect.succeed(false),
      stdout: Stream.empty,
      stderr: Stream.empty,
      stdin: Sink.drain,
      kill: () => Effect.void,
    }),
  // Mock string method used by PlatformCommand.string
  string: (_cmd: any) => Effect.succeed(""),
} as any)

const setupSolidApp = (dir: string) =>
  Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem

    // package.json
    yield* fs.writeFileString(
      `${dir}/package.json`,
      JSON.stringify({
        name: "test-solid-app",
        dependencies: {
          "solid-js": "^1.8.0",
          vite: "^5.0.0",
          tailwindcss: "^3.0.0",
        },
      }),
    )

    // tsconfig.json (minimal)
    yield* fs.writeFileString(
      `${dir}/tsconfig.json`,
      JSON.stringify({
        compilerOptions: {
          target: "ESNext",
          module: "ESNext",
          moduleResolution: "node",
          jsx: "preserve",
          jsxImportSource: "solid-js",
        },
      }),
    )

    // src directory
    yield* fs.makeDirectory(`${dir}/src`, { recursive: true })
    yield* fs.writeFileString(`${dir}/src/index.css`, "@tailwind base;")
    yield* fs.writeFileString(
      `${dir}/src/App.tsx`,
      "export default () => <div>App</div>",
    )
  })

describe("Solid E2E Flow", () => {
  it.live("scaffolds solid app, inits, and adds button", () =>
    withTempDir((dir) =>
      Effect.gen(function*() {
        const cli = Command.run(
          Command.make("cli").pipe(
            Command.withSubcommands([initCommand, addCommand]),
          ),
          { name: "test", version: "0.0.0" },
        )

        // 1. Setup Mock App
        yield* setupSolidApp(dir)

        // 2. Run Init
        // We use --install-deps=false to avoid running npm install in test
        yield* cli([
          "node",
          "test",
          "init",
          "--cwd",
          dir,
          "--yes",
          "--install-deps=false",
        ])

        const fs = yield* FileSystem.FileSystem

        // Verify components.json
        const configExists = yield* fs.exists(`${dir}/components.json`)
        expect(configExists).toBe(true)

        const config = JSON.parse(
          yield* fs.readFileString(`${dir}/components.json`),
        )
        expect(config.aliases.utils).toBe("@/lib/utils")
        expect(config.aliases.components).toBe("@/components/ui")

        // Verify tsconfig updates
        const tsconfig = JSON.parse(
          yield* fs.readFileString(`${dir}/tsconfig.json`),
        )
        expect(tsconfig.compilerOptions.paths["@/lib/utils"]).toBeDefined()
        expect(
          tsconfig.compilerOptions.paths["@/components/ui/*"],
        ).toBeDefined()

        // 3. Add Button
        // This will try to run shadcn, fail (because npx isn't mocked/we are offline-ish),
        // and trigger the fallback which writes files from our MockHttpClient
        yield* cli(["node", "test", "add", "button", "--cwd", dir])

        // Verify Files Created
        const buttonExists = yield* fs.exists(
          `${dir}/src/components/ui/button.tsx`,
        )
        const utilsExists = yield* fs.exists(`${dir}/src/lib/utils.ts`)

        expect(buttonExists).toBe(true)
        expect(utilsExists).toBe(true)

        // Verify Content
        const buttonContent = yield* fs.readFileString(
          `${dir}/src/components/ui/button.tsx`,
        )
        expect(buttonContent).toContain("export const Button")
      }).pipe(
        Effect.provide(MockHttpClient),
        Effect.provide(MockCommandExecutor),
        Effect.provide(NodeFileSystem.layer),
        Effect.provide(NodePath.layer),
        Effect.provide(NodeTerminal.layer),
      )
    ))
})
