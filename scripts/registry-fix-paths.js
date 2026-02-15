import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const outDir = path.join(root, "apps/docs/public/r")

function fixFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8")
  const json = JSON.parse(raw)
  if (Array.isArray(json.files)) {
    json.files = json.files.map((f) => {
      let p = f.path
      p = p.replace("packages/react/src/components/ui/", "ui/")
      p = p.replace("packages/solid/src/components/ui/", "ui/")
      p = p.replace("packages/shared/src/lib/", "lib/")
      return { ...f, path: p }
    })
  }
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf-8")
}

function run() {
  const variants = ["r", "s"]
  for (const v of variants) {
    const dir = path.join(outDir, v)
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".json")) continue
      fixFile(path.join(dir, file))
    }
  }
}

run()
