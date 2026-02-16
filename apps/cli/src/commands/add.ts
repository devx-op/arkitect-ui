import * as Args from "@effect/cli/Args"
import * as Command from "@effect/cli/Command"
import * as Options from "@effect/cli/Options"
import * as PlatformCommand from "@effect/platform/Command"
import * as Console from "effect/Console"
import * as Effect from "effect/Effect"
import * as Option from "effect/Option"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Path from "@effect/platform/Path"
import * as Schema from "effect/Schema"
import * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientResponse from "@effect/platform/HttpClientResponse"
import * as Config from "effect/Config"
import { ComponentsConfig } from "../schemas/components-config.js"

const DEFAULT_REGISTRY_BASE_URL = "https://devx-op.github.io/arkitect-ui/r"

// Arguments and options for add command
const componentNameArg = Args.text({ name: "component-name" }).pipe(
  Args.withDescription("Name of the Component to add"),
  Args.optional,
)

const allOption = Options.boolean("all").pipe(
  Options.withAlias("a"),
  Options.withDescription("Install all available Components"),
  Options.withDefault(false),
)

const overwriteOption = Options.boolean("overwrite").pipe(
  Options.withAlias("o"),
  Options.withDescription("Overwrite existing files"),
  Options.withDefault(false),
)

const cwdOption = Options.text("cwd").pipe(
  Options.withDescription("Current working directory"),
  Options.withDefault(process.cwd()),
)

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Simulate installation without running commands"),
  Options.withDefault(false),
)

type AddOptions = {
  componentName: Option.Option<string>
  all: boolean
  overwrite: boolean
  cwd: string
  dryRun: boolean
}

// Export the add command
export const addCommand = Command.make(
  "add",
  {
    componentName: componentNameArg,
    all: allOption,
    overwrite: overwriteOption,
    cwd: cwdOption,
    dryRun: dryRunOption,
  },
  (options: AddOptions) =>
    Effect.gen(function*() {
      const fs = yield* FileSystem.FileSystem
      const path = yield* Path.Path
      const http = (yield* HttpClient.HttpClient).pipe(
        HttpClient.filterStatusOk,
      )

      const registryBaseUrlRaw = yield* Config.string("REGISTRY_URL").pipe(
        Config.withDefault(DEFAULT_REGISTRY_BASE_URL),
      )
      const registryBaseUrl = registryBaseUrlRaw.endsWith("/")
        ? registryBaseUrlRaw.slice(0, -1)
        : registryBaseUrlRaw

      // 1. Check for components.json
      const configPath = path.join(options.cwd, "components.json")
      const hasConfig = yield* fs.exists(configPath)
      if (!hasConfig) {
        return yield* Effect.fail(
          new Error("⚠️  components.json not found. Please run 'init' first."),
        )
      }

      const configContent = yield* fs.readFileString(configPath)
      const config = yield* Schema.decodeUnknown(
        Schema.parseJson(ComponentsConfig),
      )(configContent)

      // Detect framework from package.json (solid-js vs react dependency)
      let framework: "react" | "solid" = "react"
      const packageJsonPath = path.join(options.cwd, "package.json")
      const hasPackageJson = yield* fs.exists(packageJsonPath)
      if (hasPackageJson) {
        const packageJsonContent = yield* fs.readFileString(packageJsonPath)
        const packageJson = JSON.parse(packageJsonContent)
        const deps = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
        }

        if (deps["solid-js"]) {
          framework = "solid"
        } else if (deps["react"]) {
          framework = "react"
        }
      }

      // 2. Resolve components to install
      let componentsToInstall: string[] = []

      if (options.all) {
        yield* Console.log("📦 Fetching all components from registry...")
        const RegistryIndex = Schema.Struct({
          items: Schema.Array(
            Schema.Struct({ name: Schema.String, type: Schema.String }),
          ),
        })
        const response = yield* http.get(`${registryBaseUrl}/index.json`)
        const registry = yield* HttpClientResponse.schemaBodyJson(RegistryIndex)(response)

        const frameworkPrefix = framework === "solid" ? "s/" : "r/"

        componentsToInstall = registry.items
          .filter(
            (item) =>
              item.type === "registry:ui" &&
              item.name.startsWith(frameworkPrefix),
          )
          .map((item) => item.name.split("/")[1])

        if (componentsToInstall.length === 0) {
          return yield* Console.log("⚠️  No components found to install.")
        }
      } else if (Option.isSome(options.componentName)) {
        componentsToInstall = [options.componentName.value]
      } else {
        return yield* Effect.fail(
          new Error("⚠️  Please specify a component name or use --all"),
        )
      }

      // 3. Install Components
      yield* Console.log(
        `🚀 Installing ${componentsToInstall.length} component(s) for ${framework}...`,
      )

      // Determine Registry URL path segment
      // React -> r/r, Solid -> r/s
      const frameworkPath = framework === "solid" ? "s" : "r"

      // Install sequentially to avoid race conditions in shadcn
      for (const name of componentsToInstall) {
        const args = [
          "shadcn@latest",
          "add",
          `${registryBaseUrl}/${frameworkPath}/${name}.json`,
        ]
        if (options.overwrite) args.push("--overwrite")

        const command = PlatformCommand.make("npx", ...args).pipe(
          PlatformCommand.workingDirectory(options.cwd),
        )

        yield* Console.log(`Installing ${name}...`)

        if (options.dryRun) {
          yield* Console.log(`[Dry Run] Would execute: npx ${args.join(" ")}`)
        } else {
          const output = yield* PlatformCommand.string(command).pipe(
            Effect.catchAll((err) => Effect.fail(new Error(`Failed to install ${name}: ${err}`))),
          )
          if (output && output.length > 0) {
            yield* Console.log(output)
          }
          // Verify created files; if not found, fallback to writing from registry JSON
          const RegistryItem = Schema.Struct({
            files: Schema.Array(
              Schema.Struct({
                path: Schema.String,
                content: Schema.String,
                type: Schema.optional(Schema.String),
              }),
            ),
            dependencies: Schema.optional(Schema.Array(Schema.String)),
          })
          const itemUrl = `${registryBaseUrl}/${frameworkPath}/${name}.json`
          const itemResponse = yield* http.get(itemUrl)
          const itemJson = yield* HttpClientResponse.schemaBodyJson(RegistryItem)(
            itemResponse,
          )

          const resolveAliasPath = (alias: string) => {
            return alias.startsWith("@/")
              ? path.join(options.cwd, "src", alias.replace("@/", ""))
              : path.join(options.cwd, alias)
          }

          const componentsAlias = config.aliases.components
          const utilsAlias = config.aliases.utils

          const targetPaths = itemJson.files.map((file) => {
            if (file.path.startsWith("ui/")) {
              const baseDir = resolveAliasPath(componentsAlias)
              return path.join(baseDir, file.path.replace("ui/", ""))
            } else if (file.path.startsWith("lib/")) {
              const utilsBase = resolveAliasPath(utilsAlias)
              // utils alias may point to a file (without .ts), ensure directory exists and file path matches
              const isFileAlias = !utilsAlias.endsWith("/")
              if (isFileAlias) {
                // write directly to utils alias with extension from source path
                const ext = file.path.split(".").pop() ?? "ts"
                return `${utilsBase}.${ext}`
              } else {
                const baseDir = utilsBase
                return path.join(baseDir, file.path.replace("lib/", ""))
              }
            } else {
              // default to src root
              return path.join(options.cwd, "src", file.path)
            }
          })

          const existsResults = yield* Effect.forEach(targetPaths, (p) => fs.exists(p))

          const missingIndexes: Array<number> = []
          for (let i = 0; i < existsResults.length; i++) {
            if (!existsResults[i]) {
              missingIndexes.push(i)
            }
          }

          if (missingIndexes.length > 0) {
            yield* Console.log(
              "⚠️  Missing files after shadcn add. Applying fallback write.",
            )
            for (const index of missingIndexes) {
              const file = itemJson.files[index]
              const target = targetPaths[index]
              const dir = path.dirname(target)
              const hasDir = yield* fs.exists(dir)
              if (!hasDir) {
                yield* fs.makeDirectory(dir, { recursive: true })
              }
              yield* fs.writeFileString(target, file.content)
              yield* Console.log(`✚ Created ${target}`)
            }
            yield* Console.log("✅ Fallback write completed.")

            // Install missing dependencies from registry item
            const depsList = itemJson.dependencies ?? []
            if (depsList.length > 0) {
              const packageJsonPath2 = path.join(options.cwd, "package.json")
              const hasPkg2 = yield* fs.exists(packageJsonPath2)
              let installed: Record<string, string> = {}
              if (hasPkg2) {
                const content = yield* fs.readFileString(packageJsonPath2)
                const pkg = JSON.parse(content)
                installed = {
                  ...pkg.dependencies,
                  ...pkg.devDependencies,
                }
              }
              const missing = depsList.filter((d) => !(d in installed))
              if (missing.length > 0) {
                yield* Console.log(
                  `📦 Installing dependencies: ${missing.join(", ")}...`,
                )
                let pm = "npm"
                const hasPnpmLock = yield* fs.exists(
                  path.join(options.cwd, "pnpm-lock.yaml"),
                )
                const hasYarnLock = yield* fs.exists(
                  path.join(options.cwd, "yarn.lock"),
                )
                const hasBunLock = yield* fs.exists(
                  path.join(options.cwd, "bun.lockb"),
                )
                if (hasPnpmLock) pm = "pnpm"
                else if (hasYarnLock) pm = "yarn"
                else if (hasBunLock) pm = "bun"
                const installCmd = pm === "npm" ? "install" : "add"
                const installArgs = [installCmd, ...missing]
                const installCommand = PlatformCommand.make(
                  pm,
                  ...installArgs,
                ).pipe(PlatformCommand.workingDirectory(options.cwd))
                yield* PlatformCommand.string(installCommand).pipe(
                  Effect.catchAll((err) =>
                    Effect.fail(
                      new Error(`Failed to install dependencies: ${err}`),
                    )
                  ),
                )
                yield* Console.log("✅ Dependencies installed successfully.")
              }
            }
          }
        }
      }

      yield* Console.log("✅ All components installed successfully.")
    }),
)
