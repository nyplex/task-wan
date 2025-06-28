import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../components/gluestack/box";
import Button from "../../components/buttons/Button";
import useToast from "../../hooks/useToast";

const meta = {
  title: "UI/Toast",
  component: Button,
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          flex: 1,
        }}>
        <Story />
      </View>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    title: "Interactive Toast",
  },
  render: () => {
    const { handleToast } = useToast();

    const openToast = () => {
      handleToast("Toast Title", "This is a description for the toast message.", () => {
        console.log("Toast closed");
      });
    };

    return (
      <Box>
        <Button
          title="Open Toast"
          onPress={openToast}
        />
      </Box>
    );
  },
};
