import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Grid } from "./grid"

const meta: Meta<typeof Grid> = {
  title: "Solid/UI/Grid",
  component: Grid,
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: () => (
    <Grid columns={3} class="w-96">
      <div class="bg-muted p-4 rounded">1</div>
      <div class="bg-muted p-4 rounded">2</div>
      <div class="bg-muted p-4 rounded">3</div>
      <div class="bg-muted p-4 rounded">4</div>
      <div class="bg-muted p-4 rounded">5</div>
      <div class="bg-muted p-4 rounded">6</div>
    </Grid>
  ),
}

export const WithGap: Story = {
  render: () => (
    <Grid columns={2} gap={4} class="w-96">
      <div class="bg-muted p-4 rounded">1</div>
      <div class="bg-muted p-4 rounded">2</div>
      <div class="bg-muted p-4 rounded">3</div>
      <div class="bg-muted p-4 rounded">4</div>
    </Grid>
  ),
}
