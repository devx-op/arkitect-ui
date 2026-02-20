import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { createSignal } from "solid-js"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Button } from "./button"

const meta: Meta<typeof DropdownMenu> = {
  title: "Solid/UI/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          "justify-content": "center",
          "align-items": "flex-start",
          "min-height": "100vh",
          "padding-top": "2rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuItem value="profile">
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem value="billing">
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem value="settings">
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem value="keyboard">
          Keyboard shortcuts
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem value="team">Team</DropdownMenuItem>
        <DropdownMenuItem value="new-team">
          New Team
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem value="github">GitHub</DropdownMenuItem>
        <DropdownMenuItem value="support">Support</DropdownMenuItem>
        <DropdownMenuItem value="api" disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem value="logout">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithCheckbox: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = createSignal(true)
    const [showActivityBar, setShowActivityBar] = createSignal(false)
    const [showPanel, setShowPanel] = createSignal(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Open Checkbox Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuCheckboxItem
            value="status-bar"
            checked={showStatusBar()}
            onCheckedChange={(checked) => setShowStatusBar(checked as boolean)}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            value="activity-bar"
            checked={showActivityBar()}
            onCheckedChange={(checked) => setShowActivityBar(checked as boolean)}
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            value="panel"
            checked={showPanel()}
            onCheckedChange={(checked) => setShowPanel(checked as boolean)}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

export const WithRadio: Story = {
  render: () => {
    const [position, setPosition] = createSignal("bottom")

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Open Radio Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuRadioGroup value={position()} onValueChange={(e) => setPosition(e.value)}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
