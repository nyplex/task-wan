import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegisterForm from "../components/RegisterForm";

let mockSignup: jest.Mock;
jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    get signup() {
      return mockSignup;
    },
  }),
}));
jest.mock("react-redux", () => ({ useSelector: () => false }));

describe("RegisterForm", () => {
  it("renders inputs and button", () => {
    const { getByPlaceholderText, getByText } = render(<RegisterForm />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Username")).toBeTruthy();
    expect(getByText("Register")).toBeTruthy();
  });

  it("matches the snapshot", () => {
    const { toJSON } = render(<RegisterForm />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("disables register button and does not call signup for invalid email", async () => {
    mockSignup = jest.fn();
    const { getByPlaceholderText, getByText } = render(<RegisterForm />);
    fireEvent.changeText(getByPlaceholderText("Email"), "invalid-email");
    fireEvent.changeText(getByPlaceholderText("Username"), "validuser");
    const button = getByText("Register");
    fireEvent.press(button);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it("disables register button and does not call signup for invalid username", async () => {
    mockSignup = jest.fn();
    const { getByPlaceholderText, getByText } = render(<RegisterForm />);
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Username"), "a"); // too short
    const button = getByText("Register");
    fireEvent.press(button);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it("calls signup on valid submit", async () => {
    mockSignup = jest.fn();
    const { getByPlaceholderText, getByText } = render(<RegisterForm />);
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Username"), "validuser");

    // Traverse up to the pressable button
    let button = getByText("Register");
    while (button && !button.props.onPress) {
      button = button.parent;
    }

    await waitFor(() => {
      expect(button.props.disabled).toBe(false);
    });
    fireEvent.press(button);
    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith("test@example.com", "validuser");
    });
  });
});
