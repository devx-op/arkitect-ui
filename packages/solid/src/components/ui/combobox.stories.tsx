import type { Meta, StoryObj } from "storybook-solidjs-vite"
import { createSignal } from "solid-js"
import { createListCollection } from "@ark-ui/solid"
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
  title: "Solid/UI/Combobox",
  component: Combobox,
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
type Story = StoryObj<typeof Combobox>

export const Default: Story = {
  render: () => {
    const [value, setValue] = createSignal<string[]>([])

    return (
      <Combobox
        collection={frameworks}
        value={value()}
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxContent portal={true}>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {frameworks.items.map((item) => (
              <ComboboxItem item={item}>
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
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
