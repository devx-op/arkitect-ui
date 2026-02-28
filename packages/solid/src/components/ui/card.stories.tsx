import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

const meta = {
  title: "Solid/UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <p class="text-sm text-muted-foreground">Card footer</p>
      </CardFooter>
    </Card>
  ),
}

export const WithCTA: Story = {
  render: () => (
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Subscribe</CardTitle>
        <CardDescription>Get the latest updates delivered to your inbox.</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">
          Join our newsletter to stay up to date on features and releases.
        </p>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Subscribe</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card class="w-[350px]">
      <CardContent>
        <p>This is a simple card with just content.</p>
      </CardContent>
    </Card>
  ),
}
