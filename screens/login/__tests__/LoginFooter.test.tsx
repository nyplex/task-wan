import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginFooter from "../components/LoginFooter";

jest.mock("expo-router", () => ({ useRouter: () => ({ navigate: jest.fn() }) }));
jest.mock("react-redux", () => ({ useSelector: () => false }));

describe("LoginFooter", () => {
  it("renders correctly and matches snapshot", () => {
    const { toJSON, getByText } = render(<LoginFooter />);
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders Sign Up as bold and underlined", () => {
    const { getByText } = render(<LoginFooter />);
    const signUp = getByText("Sign Up");
    expect(signUp.props.className).toContain("underline");
    expect(signUp.props.className).toContain("font-bold");
  });

  it("calls router.navigate when Sign Up is pressed", () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require("expo-router"), "useRouter").mockReturnValue({ navigate: mockNavigate });
    const { getByText } = render(<LoginFooter />);
    fireEvent.press(getByText("Sign Up"));
    expect(mockNavigate).toHaveBeenCalledWith("/(app)/Register");
  });

  it("disables Sign Up when loading", () => {
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue(true);
    const { getByText } = render(<LoginFooter />);
    expect(getByText("Sign Up").props.disabled).toBe(true);
  });
});
