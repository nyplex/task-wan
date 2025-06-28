import React from "react";
import { render } from "@testing-library/react-native";
import ProfileCard from "../ProfileCard";

describe("ProfileCard", () => {
  const defaultProps = {
    name: "Alex Dupont",
    profession: "Software Engineer",
    location: "London",
    tasksCompleted: 42,
    avatarURL: "https://example.com/avatar.jpg",
  };

  it("renders the name and profession", () => {
    const { getByText } = render(<ProfileCard {...defaultProps} />);
    expect(getByText("Alex Dupont")).toBeTruthy();
    expect(getByText("Software Engineer")).toBeTruthy();
  });

  it("renders the avatar with fallbackName and avatarURL", () => {
    const { getByTestId } = render(<ProfileCard {...defaultProps} />);
    // Assuming Avatar has testID="avatar"
    expect(getByTestId("avatar-pressable")).toBeTruthy();
  });

  it("renders location if provided", () => {
    const { getByText } = render(<ProfileCard {...defaultProps} />);
    expect(getByText("London")).toBeTruthy();
  });

  it("does not render location if not provided", () => {
    const { queryByText } = render(
      <ProfileCard
        {...defaultProps}
        location={undefined}
      />
    );
    expect(queryByText("London")).toBeNull();
  });

  it("renders tasks completed text correctly", () => {
    const { getByText } = render(<ProfileCard {...defaultProps} />);
    expect(getByText("42 Task completed")).toBeTruthy();
  });

  it("renders tasks completed as 0 if not provided", () => {
    const { getByText } = render(
      <ProfileCard
        {...defaultProps}
        tasksCompleted={0}
      />
    );
    expect(getByText("0 Task completed")).toBeTruthy();
  });

  it("renders profession as empty if not provided", () => {
    const { getByText } = render(
      <ProfileCard
        {...defaultProps}
        profession={undefined}
      />
    );
    // Text component renders empty string if profession undefined
    expect(getByText("")).toBeTruthy();
  });
});
