import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { createListCollection } from "@ark-ui/react"
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPositioner,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  Portal,
} from "./combobox"

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

const meta: Meta<typeof Combobox> = {
  title: "React/UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          paddingTop: "2rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])

    return (
      <Combobox
        collection={frameworks}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <ComboboxLabel>Framework</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="Select a framework" />
          <ComboboxTrigger>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L7 9L11 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxContent portal={true}>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {frameworks.items.map((item) => (
              <ComboboxItem key={item.value} item={item}>
                <ComboboxItemIndicator>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L7 9L11 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ComboboxItemIndicator>
                {item.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}
