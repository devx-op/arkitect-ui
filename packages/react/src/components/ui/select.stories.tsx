import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { createListCollection } from "@ark-ui/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta: Meta<typeof Select> = {
  title: "React/UI/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof Select>

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
})

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    return (
      <Select
        collection={frameworks}
        value={[value]}
        onValueChange={(e) => setValue(e.value[0] ?? "")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((framework) => (
            <SelectItem key={framework.value} item={framework}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    const groupedCollection = createListCollection({
      items: [
        { label: "JavaScript", value: "javascript", group: "JavaScript" },
        { label: "TypeScript", value: "typescript", group: "JavaScript" },
        { label: "Python", value: "python", group: "Python" },
        { label: "Django", value: "django", group: "Python" },
        { label: "Go", value: "go", group: "Go" },
        { label: "Rust", value: "rust", group: "Go" },
      ],
      itemToString: (item) => item.label,
      itemToValue: (item) => item.value,
    })

    return (
      <Select
        collection={groupedCollection}
        value={[value]}
        onValueChange={(e) => setValue(e.value[0] ?? "")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>JavaScript</SelectLabel>
            <SelectItem item={groupedCollection.items[0]}>JavaScript</SelectItem>
            <SelectItem item={groupedCollection.items[1]}>TypeScript</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Python</SelectLabel>
            <SelectItem item={groupedCollection.items[2]}>Python</SelectItem>
            <SelectItem item={groupedCollection.items[3]}>Django</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Go</SelectLabel>
            <SelectItem item={groupedCollection.items[4]}>Go</SelectItem>
            <SelectItem item={groupedCollection.items[5]}>Rust</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
}

export const WithSeparator: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    return (
      <Select
        collection={frameworks}
        value={[value]}
        onValueChange={(e) => setValue(e.value[0] ?? "")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem item={frameworks.items[0]}>Profile</SelectItem>
          <SelectItem item={frameworks.items[1]}>Billing</SelectItem>
          <SelectItem item={frameworks.items[2]}>Settings</SelectItem>
          <SelectSeparator />
          <SelectItem item={frameworks.items[3]}>Logout</SelectItem>
        </SelectContent>
      </Select>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    const disabledCollection = createListCollection({
      items: [
        { label: "React", value: "react" },
        { label: "Solid", value: "solid" },
        { label: "Vue", value: "vue" },
        { label: "Svelte", value: "svelte", disabled: true },
      ],
      itemToString: (item) => item.label,
      itemToValue: (item) => item.value,
      isItemDisabled: (item) => item.disabled ?? false,
    })

    return (
      <Select
        collection={disabledCollection}
        value={[value]}
        onValueChange={(e) => setValue(e.value[0] ?? "")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          {disabledCollection.items.map((framework) => (
            <SelectItem key={framework.value} item={framework}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}
