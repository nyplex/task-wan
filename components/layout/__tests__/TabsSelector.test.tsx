import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TabsSelector from "../TabsSelector";

describe("TabsSelector", () => {
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];

  it("renders all tabs", () => {
    const { getByText } = render(
      <TabsSelector tabs={tabs} selectedTab={0} onTabSelect={() => {}} />,
    );
    tabs.forEach((tab) => {
      expect(getByText(tab)).toBeTruthy();
    });
  });

  it("highlights the selected tab", () => {
    const selectedTab = 1;
    const { getByText } = render(
      <TabsSelector
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={() => {}}
      />,
    );
    const selectedTabText = getByText(tabs[selectedTab]);
    expect(selectedTabText.props.className).toContain("text-primary-50");
  });

  it("calls onTabSelect with correct index when a tab is pressed", () => {
    const onTabSelect = jest.fn();
    const { getByText } = render(
      <TabsSelector tabs={tabs} selectedTab={0} onTabSelect={onTabSelect} />,
    );

    fireEvent.press(getByText(tabs[2]));
    expect(onTabSelect).toHaveBeenCalledWith(2);
  });

  it("disables all tabs when disabled prop is true", () => {
    const onTabSelect = jest.fn();
    const { getByText } = render(
      <TabsSelector
        tabs={tabs}
        selectedTab={0}
        disabled
        onTabSelect={onTabSelect}
      />,
    );

    const tab = getByText(tabs[1]);
    fireEvent.press(tab);
    expect(onTabSelect).not.toHaveBeenCalled();
  });
});
