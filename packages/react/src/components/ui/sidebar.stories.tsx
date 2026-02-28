import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupTitle,
  SidebarHeader,
  SidebarItem,
  SidebarToggle,
} from "./sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "React/UI/Sidebar",
  component: Sidebar,
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => (
    <div className="h-[400px] border">
      <Sidebar>
        <SidebarHeader>
          <SidebarToggle />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupTitle>Navigation</SidebarGroupTitle>
            <SidebarGroupContent>
              <SidebarItem>Dashboard</SidebarItem>
              <SidebarItem>Analytics</SidebarItem>
              <SidebarItem>Settings</SidebarItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem>Logout</SidebarItem>
        </SidebarFooter>
      </Sidebar>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div className="h-[400px] border">
      <Sidebar collapsed>
        <SidebarHeader>
          <SidebarToggle collapsed />
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem>📊</SidebarItem>
          <SidebarItem>📈</SidebarItem>
          <SidebarItem>⚙️</SidebarItem>
        </SidebarContent>
      </Sidebar>
    </div>
  ),
}
