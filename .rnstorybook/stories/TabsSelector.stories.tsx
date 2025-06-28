import React, { useEffect } from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import TabsSelector from "../../components/layout/TabsSelector";

const meta = {
  title: "Layout/TabsSelector",
  component: TabsSelector,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    tabs: {
      control: "multi-select",
      options: ["Tab 1", "Tab 2", "Tab 3", "Tab 4"],
    },
    disabled: {
      control: "boolean",
      description: "Disable the tabs selector",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TabsSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    tabs: ["Tab 1", "Tab 2", "Tab 3"],
    onTabSelect: (index: number) => {
      return;
    },
    selectedTab: 2,
    disabled: false,
  },
  render: (args: any) => {
    const [selectedTab, setSelectedTab] = React.useState(args.selectedTab ?? 0);

    useEffect(() => {
      setSelectedTab(args.selectedTab);
    }, [args.selectedTab]);

    return (
      <TabsSelector
        selectedTab={selectedTab}
        tabs={args.tabs}
        disabled={args.disabled}
        onTabSelect={(index: number) => {
          action("onTabSelect")({ args: index });
          setSelectedTab(index);
          args.onTabSelect(index);
        }}
      />
    );
  },
};
