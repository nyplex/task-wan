import React from "react";
import { Text, View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import ScreenWrapper from "../../components/layout/ScreenWrapper";

const meta = {
  title: "Layout/ScreenWrapper",
  component: ScreenWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof ScreenWrapper>;

export default meta;

//@ts-ignore
export const Default: StoryObj<typeof meta> = {
  render: () => {
    return (
      <ScreenWrapper
        header={
          <View style={{ height: 50 }}>
            <Text style={{ textAlign: "center", padding: 10 }}>Header</Text>
          </View>
        }>
        <View style={{ paddingHorizontal: 0 }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              padding: 10,
              color: "black",
            }}>
            Main Content
          </Text>
        </View>
      </ScreenWrapper>
    );
  },
};
