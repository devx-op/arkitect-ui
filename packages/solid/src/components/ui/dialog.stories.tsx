import type { Meta, StoryObj } from "storybook-solidjs-vite"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"

const meta = {
  title: "Solid/UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          This is a description of the dialog content.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithSize: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Open Large Dialog</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Large Dialog</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          This dialog uses the large size variant.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Fullscreen: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Open Fullscreen</Button>
      </DialogTrigger>
      <DialogContent size="fullscreen">
        <DialogHeader>
          <DialogTitle>Fullscreen Dialog</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          This dialog takes up the entire screen.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
