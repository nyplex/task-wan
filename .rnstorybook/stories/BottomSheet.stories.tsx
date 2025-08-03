import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Box } from "../../components/gluestack/box";
import { useBottomSheet } from "../../hooks/useBottomSheet";
import Button from "../../components/buttons/Button";

const meta = {
  title: "BottomSheets/Logout",
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    title: "Logout",
  },
  render: () => <LogoutStory />,
};

const LogoutStory = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const handleOpenLogoutSheet = () => {
    openBottomSheet("LogoutBottomSheet", {
      onPressLogout: () => {
        action("Logout Pressed")();
        closeBottomSheet();
      },
      onPressCancel: () => {
        action("Cancel Pressed")();
        closeBottomSheet();
      },
    });
  };

  return (
    <Box>
      <Button title="Open Logout BottomSheet" onPress={handleOpenLogoutSheet} />
    </Box>
  );
};
