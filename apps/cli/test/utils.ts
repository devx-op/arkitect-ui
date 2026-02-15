import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem"
import * as Effect from "effect/Effect"
import * as NodePath from "node:path"
import * as OS from "node:os"
import * as FS from "node:fs/promises"

export const createTempDir = Effect.promise(async () => {
  const tmpDir = await FS.mkdtemp(
    NodePath.join(OS.tmpdir(), "arkitect-cli-test-"),
  )
  return tmpDir
})

export const cleanupTempDir = (dir: string) =>
  Effect.promise(async () => {
    await FS.rm(dir, { recursive: true, force: true })
  })

export const withTempDir = <A, E, R>(
  f: (dir: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function*() {
    const dir = yield* createTempDir
    try {
      return yield* f(dir)
    } finally {
      yield* cleanupTempDir(dir)
    }
  })

export const TestFileSystem = NodeFileSystem.layer
