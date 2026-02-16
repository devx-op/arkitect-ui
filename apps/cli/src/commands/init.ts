import * as Command from "@effect/cli/Command"
import * as Options from "@effect/cli/Options"
import * as Prompt from "@effect/cli/Prompt"
import * as PlatformCommand from "@effect/platform/Command"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Console from "effect/Console"
import * as Effect from "effect/Effect"
import * as Option from "effect/Option"
import * as Schema from "effect/Schema"
import { ComponentsConfig } from "../schemas/components-config.js"
import * as NodePath from "node:path"
import { fileURLToPath } from "node:url"

const here = NodePath.dirname(fileURLToPath(import.meta.url))
const cssTemplatePath = NodePath.resolve(here, "../../templates/global.css")

// Options for the init command
const cwdOption = Options.text("cwd").pipe(
  Options.withDescription("Current working directory"),
  Options.withDefault(process.cwd()),
)

const frameworkOption = Options.choice("framework", ["react", "solid"]).pipe(
  Options.withDescription("Framework to use"),
  Options.optional,
)

const srcDirOption = Options.text("src-dir").pipe(
  Options.withDescription("Source directory"),
  Options.optional,
)

const componentsDirOption = Options.text("components-dir").pipe(
  Options.withDescription("Components directory"),
  Options.optional,
)

const utilsPathOption = Options.text("utils-path").pipe(
  Options.withDescription("Utils file path"),
  Options.optional,
)

const cssPathOption = Options.text("css-path").pipe(
  Options.withDescription("Global CSS file path"),
  Options.optional,
)

const yesOption = Options.boolean("yes").pipe(
  Options.withAlias("y"),
  Options.withDescription("Skip prompts and use defaults/flags"),
)

const installDepsOption = Options.choice("install-deps", [
  "yes",
  "no",
  "true",
  "false",
]).pipe(
  Options.withDescription("Install dependencies after setup: yes or no"),
  Options.optional,
)

type InitOptions = {
  cwd: string
  framework: Option.Option<string>
  srcDir: Option.Option<string>
  componentsDir: Option.Option<string>
  utilsPath: Option.Option<string>
  cssPath: Option.Option<string>
  yes: boolean
  installDeps: Option.Option<"yes" | "no" | "true" | "false">
}

// Export the init command
export const initCommand = Command.make(
  "init",
  {
    cwd: cwdOption,
    framework: frameworkOption,
    srcDir: srcDirOption,
    componentsDir: componentsDirOption,
    utilsPath: utilsPathOption,
    cssPath: cssPathOption,
    yes: yesOption,
    installDeps: installDepsOption,
  },
  (options: InitOptions) =>
    Effect.gen(function*() {
      const fs = yield* FileSystem.FileSystem

      yield* Console.log("🚀 Initializing Arkitect UI configuration...")

      // 1. Detect Framework
      let detectedFramework: "react" | "solid" = "react"
      const packageJsonPath = `${options.cwd}/package.json`
      const hasPackageJson = yield* fs.exists(packageJsonPath)

      if (hasPackageJson) {
        const packageJsonContent = yield* fs.readFileString(packageJsonPath)
        const packageJson = JSON.parse(packageJsonContent)
        const deps = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
        }

        if (deps["solid-js"]) {
          detectedFramework = "solid"
        } else if (deps["react"]) {
          detectedFramework = "react"
        }
      }

      // Determine Framework
      const framework = yield* Option.match(options.framework, {
        onNone: () =>
          options.yes
            ? Effect.succeed(detectedFramework)
            : Prompt.select({
              message: "Which framework are you using?",
              choices: [
                {
                  title: "React",
                  value: "react",
                  selected: detectedFramework === "react",
                },
                {
                  title: "Solid",
                  value: "solid",
                  selected: detectedFramework === "solid",
                },
              ],
            }).pipe(Effect.map((f) => f as "react" | "solid")),
        onSome: (f) => Effect.succeed(f as "react" | "solid"),
      })

      // 2. Resolve Paths
      const resolvePath = (
        option: Option.Option<string>,
        promptMsg: string,
        defaultValue: string,
      ) =>
        Option.match(option, {
          onNone: () =>
            options.yes
              ? Effect.succeed(defaultValue)
              : Prompt.text({ message: promptMsg, default: defaultValue }),
          onSome: Effect.succeed,
        })

      const srcDir = yield* resolvePath(
        options.srcDir,
        "Where is your source directory?",
        "src",
      )

      const componentsDir = yield* resolvePath(
        options.componentsDir,
        "Where would you like to install components?",
        `${srcDir}/components/ui`,
      )

      const utilsPath = yield* resolvePath(
        options.utilsPath,
        "Where is your utils file located?",
        `${srcDir}/lib/utils.ts`,
      )

      const cssPath = yield* resolvePath(
        options.cssPath,
        "Where is your global CSS file?",
        `${srcDir}/index.css`,
      )

      // 3. Generate components.json
      const componentsConfig = new ComponentsConfig({
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: framework === "react",
        tsx: true,
        tailwind: {
          config: "",
          css: cssPath,
          baseColor: "slate",
          cssVariables: true,
          prefix: "",
        },
        aliases: {
          // Use import-style aliases; TS config handles resolving "@/..."
          components: `@/${componentsDir.replace(`${srcDir}/`, "")}`,
          utils: `@/${utilsPath.replace(`${srcDir}/`, "").replace(".ts", "")}`,
          ui: `@/${componentsDir.replace(`${srcDir}/`, "")}`,
        },
      })

      const encodedConfig = yield* Schema.encode(ComponentsConfig)(componentsConfig)
      const encodedJson = JSON.stringify(encodedConfig, null, 2)

      yield* fs.writeFileString(
        `${options.cwd}/components.json`,
        `${encodedJson}\n`,
      )
      yield* Console.log("✅ components.json created successfully.")

      const cssTargetPath = NodePath.isAbsolute(cssPath)
        ? cssPath
        : NodePath.join(options.cwd, cssPath)

      const hasTemplate = yield* fs.exists(cssTemplatePath)
      if (hasTemplate) {
        const cssDir = NodePath.dirname(cssTargetPath)
        const hasCssDir = yield* fs.exists(cssDir)
        if (!hasCssDir) {
          yield* fs.makeDirectory(cssDir, { recursive: true })
        }
        const cssContent = yield* fs.readFileString(cssTemplatePath)
        yield* fs.writeFileString(cssTargetPath, cssContent)
        yield* Console.log(`✅ Global CSS created at ${cssPath}`)
      } else {
        yield* Console.log(
          "⚠️  Arkitect UI CSS template not found. Skipping CSS file creation.",
        )
      }

      const utilsTargetPath = NodePath.isAbsolute(utilsPath)
        ? utilsPath
        : NodePath.join(options.cwd, utilsPath)
      const hasUtils = yield* fs.exists(utilsTargetPath)
      if (!hasUtils) {
        const utilsDir = NodePath.dirname(utilsTargetPath)
        const hasUtilsDir = yield* fs.exists(utilsDir)
        if (!hasUtilsDir) {
          yield* fs.makeDirectory(utilsDir, { recursive: true })
        }
        const utilsContent = 'import { type ClassValue, clsx } from "clsx"\n' +
          'import { twMerge } from "tailwind-merge"\n\n' +
          "export function cn(...inputs: ClassValue[]) {\n" +
          "  return twMerge(clsx(inputs))\n" +
          "}\n"
        yield* fs.writeFileString(utilsTargetPath, utilsContent)
        yield* Console.log(`✅ Utils file created at ${utilsPath}`)
      }

      // 3.1 Update tsconfig paths to match aliases
      const tsconfigPath = `${options.cwd}/tsconfig.json`
      const hasTsconfig = yield* fs.exists(tsconfigPath)

      if (hasTsconfig) {
        try {
          const tsContent = yield* fs.readFileString(tsconfigPath)
          const raw = tsContent
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/^\s*\/\/.*$/gm, "")
          const ts = JSON.parse(raw)
          ts.compilerOptions ??= {}
          ts.compilerOptions.baseUrl ??= "."
          // Use simplified generic alias mapping
          ts.compilerOptions.paths = {
            "@/*": [`./${srcDir}/*`],
            ...ts.compilerOptions.paths,
          }

          yield* fs.writeFileString(
            tsconfigPath,
            JSON.stringify(ts, null, 2) + "\n",
          )
          yield* Console.log("✅ tsconfig.json paths updated.")
        } catch {
          yield* Console.log("⚠️  Failed to update paths in tsconfig.json.")
        }
      }

      // 3.1b If tsconfig.app.json exists, ensure it also has baseUrl and generic @/* paths
      const tsconfigAppPath = `${options.cwd}/tsconfig.app.json`
      const hasTsconfigApp = yield* fs.exists(tsconfigAppPath)
      if (hasTsconfigApp) {
        try {
          const tsContent = yield* fs.readFileString(tsconfigAppPath)
          const raw = tsContent
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/^\s*\/\/.*$/gm, "")
          const ts = JSON.parse(raw)
          ts.compilerOptions ??= {}
          ts.compilerOptions.baseUrl ??= "."
          ts.compilerOptions.paths = {
            "@/*": [`./${srcDir}/*`],
            ...ts.compilerOptions.paths,
          }
          yield* fs.writeFileString(
            tsconfigAppPath,
            JSON.stringify(ts, null, 2) + "\n",
          )
          yield* Console.log("✅ tsconfig.app.json paths updated.")
        } catch {
          yield* Console.log(
            "⚠️  Failed to update paths in tsconfig.app.json.",
          )
        }
      }

      // 3.2 Update Vite resolve.alias for "@/..." if this is a Vite project
      const viteConfigCandidates = [
        "vite.config.ts",
        "vite.config.mts",
        "vite.config.js",
        "vite.config.mjs",
      ] as const

      let viteConfigPath: string | undefined
      for (const rel of viteConfigCandidates) {
        const full = `${options.cwd}/${rel}`
        const exists = yield* fs.exists(full)
        if (exists) {
          viteConfigPath = full
          break
        }
      }

      if (viteConfigPath) {
        try {
          const viteContent = yield* fs.readFileString(viteConfigPath)

          // If alias "@" already exists, respect existing configuration
          const hasAtAlias = /['"]@['"]\s*:/.test(viteContent)

          if (!hasAtAlias) {
            // Ensure we can use fileURLToPath / URL for robust ESM-safe alias
            let updated = viteContent
            if (
              !updated.includes('from "node:url"') &&
              !updated.includes("from 'node:url'")
            ) {
              updated = 'import { fileURLToPath, URL } from "node:url";\n' + updated
            }

            const aliasLine = '      "@": fileURLToPath(new URL("./src", import.meta.url)),'

            if (updated.includes("alias: {")) {
              updated = updated.replace(
                /alias:\s*\{/,
                `alias: {\n${aliasLine}`,
              )
            } else if (updated.includes("resolve: {")) {
              updated = updated.replace(
                /resolve:\s*\{/,
                `resolve: {\n    alias: {\n${aliasLine}\n    },`,
              )
            } else if (updated.includes("defineConfig({")) {
              updated = updated.replace(
                /defineConfig\(\s*\{/,
                `defineConfig({\n  resolve: {\n    alias: {\n${aliasLine}\n    },\n  },`,
              )
            }

            if (updated !== viteContent) {
              yield* fs.writeFileString(viteConfigPath, updated)
              yield* Console.log("✅ Vite alias @ updated.")
            }
          }
        } catch {
          yield* Console.log("⚠️  Failed to update Vite resolve.alias.")
        }
      }

      // 4. Ensure dependencies in package.json
      const baseDeps = ["clsx", "tailwind-merge", "class-variance-authority"]
      const allDeps = [...baseDeps]

      const versionTemplate: Record<string, string> = {
        clsx: "2.1.1",
        "tailwind-merge": "3.4.0",
        "class-variance-authority": "0.7.1",
      }

      // Ensure dependencies exist in package.json using the template versions
      const hasPackageJsonForDeps = yield* fs.exists(packageJsonPath)
      if (hasPackageJsonForDeps) {
        const pkgContent = yield* fs.readFileString(packageJsonPath)
        const pkg = JSON.parse(pkgContent)
        pkg.dependencies ??= {}
        pkg.devDependencies ??= {}
        for (const dep of allDeps) {
          if (!pkg.dependencies[dep] && !pkg.devDependencies[dep]) {
            const version = versionTemplate[dep]
            if (version) {
              pkg.dependencies[dep] = version
            }
          }
        }
        yield* fs.writeFileString(
          packageJsonPath,
          JSON.stringify(pkg, null, 2) + "\n",
        )
        yield* Console.log("✅ package.json dependencies updated.")
      } else {
        yield* Console.log(
          "⚠️  package.json not found. Skipping dependency hints.",
        )
      }

      // 5. Optionally install dependencies (interactive if not specified)
      // Detect package manager walking up from cwd to workspace root
      let pm = "npm"
      {
        let currentDir = options.cwd
        for (let i = 0; i < 5; i++) {
          const pnpmLock = NodePath.join(currentDir, "pnpm-lock.yaml")
          const yarnLock = NodePath.join(currentDir, "yarn.lock")
          const bunLock = NodePath.join(currentDir, "bun.lockb")
          const pkgLock = NodePath.join(currentDir, "package-lock.json")

          const hasPnpmLock = yield* fs.exists(pnpmLock)
          const hasYarnLock = yield* fs.exists(yarnLock)
          const hasBunLock = yield* fs.exists(bunLock)
          const hasPkgLock = yield* fs.exists(pkgLock)

          if (hasPnpmLock) {
            pm = "pnpm"
            break
          }
          if (hasYarnLock) {
            pm = "yarn"
            break
          }
          if (hasBunLock) {
            pm = "bun"
            break
          }
          if (hasPkgLock) {
            pm = "npm"
            break
          }

          const parent = NodePath.dirname(currentDir)
          if (parent === currentDir) {
            break
          }
          currentDir = parent
        }
      }

      const shouldInstallDeps = yield* Option.match(options.installDeps, {
        onNone: () =>
          options.yes
            ? Effect.succeed(false)
            : Prompt.confirm({
              message: `Install required Arkitect UI dependencies now with ${pm}?`,
              initial: true,
            }),
        onSome: (v) => Effect.succeed(v === "yes" || v === "true"),
      })

      if (shouldInstallDeps) {
        yield* Console.log(
          `📦 Installing dependencies: ${allDeps.join(", ")}...`,
        )

        const installCmd = pm === "npm" ? "install" : "add"

        const depArgs = allDeps.map((dep) => {
          const version = versionTemplate[dep]
          return version ? `${dep}@${version}` : dep
        })

        const args = [installCmd, ...depArgs]

        const command = PlatformCommand.make(pm, ...args).pipe(
          PlatformCommand.workingDirectory(options.cwd),
        )

        yield* PlatformCommand.string(command).pipe(
          Effect.catchAll((err) => Effect.fail(new Error(`Failed to install dependencies: ${err}`))),
        )

        yield* Console.log("✅ Dependencies installed successfully.")
      }
    }),
)
