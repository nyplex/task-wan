import { useEffect, useState } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import ToggleButton from "../../components/buttons/ToggleButton";

const meta = {
  title: "Buttons/ToggleButton",
  component: ToggleButton,
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the toggle button",
    },
    disabled: {
      control: "boolean",
      description: "Disable the switch",
    },
    isToggled: {
      control: "boolean",
      description: "Whether the toggle button is toggled on or off",
    },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    isToggled: false,
    title: "Toggle Me",
    disabled: false,
    onPress: (value: boolean) => {
      action("onValueChange")(value);
    },
  },
  render: (args) => <InteractiveToggleButton {...args} />,
};

const InteractiveToggleButton = (args) => {
  const [value, setValue] = useState(args.isToggled);

  useEffect(() => {
    setValue(args.isToggled);
  }, [args.isToggled]);

  return (
    <ToggleButton
      {...args}
      isToggled={value}
      onPress={(newValue) => {
        setValue(newValue);
        args.onPress?.(newValue);
      }}
    />
  );
};
