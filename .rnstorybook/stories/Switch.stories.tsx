import { useEffect, useState } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import Switch from "../../components/form/Switch";

const meta = {
  title: "Form/Switch",
  component: Switch,
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
    disabled: {
      control: "boolean",
      description: "Disable the switch",
    },
    value: {
      control: "boolean",
      description: "Current value of the switch",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    onValueChange: (value: boolean) => {
      action("onValueChange")(value);
    },
    value: false,
    disabled: false,
  },
  render: (args) => <InteractiveSwitch {...args} />,
};

const InteractiveSwitch = (args) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <Switch
      {...args}
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue);
        args.onValueChange(newValue);
      }}
    />
  );
};
