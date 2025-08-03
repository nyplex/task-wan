import { useState } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/form/Input";

const meta = {
  title: "Form/Input",
  component: Input,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    autoCapitalize: {
      control: "radio",
      options: ["none", "sentences", "words", "characters"],
    },
    // autoCorrect: {
    //   control: "boolean",
    // },
    isDisabled: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    keyboardType: {
      control: "radio",
      options: [
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad",
        "url",
      ],
    },
    leftIcon: {
      options: [false, true],
      mapping: {
        true: <Ionicons name="arrow-back" size={18} color="white" />,
        false: undefined,
      },
      control: {
        type: "boolean",
      },
    },
    maxLength: {
      control: "number",
    },
    placeholder: {
      control: "text",
    },
  },
  args: {
    onChangeText: action("onChangeText"),
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => <InteractiveInput {...args} />,
  args: {
    autoCapitalize: "none",
    autoCorrect: false,
    isDisabled: false,
    isInvalid: false,
    keyboardType: "default",
    // leftIcon: false,
    maxLength: 100,
    placeholder: "Type here...",
  },
};

const InteractiveInput = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <Input
      {...args}
      value={value}
      onChangeText={(text) => {
        setValue(text);
        args.onChangeText?.(text);
      }}
    />
  );
};
