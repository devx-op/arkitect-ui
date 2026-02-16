import type { Component } from "solid-js"
import { Button } from "@/components/ui/button"

const App: Component = () => {
  return (
    <div>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
      <Button>Click me</Button>
    </div>
  )
}

export default App
