import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginForm from "../components/LoginForm";

let mockLogin: jest.Mock;
jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    get login() {
      return mockLogin;
    },
  }),
}));
jest.mock("react-redux", () => ({ useSelector: () => false }));

describe("LoginForm", () => {
  it("renders input and button", () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("matches the snapshot", () => {
    const { toJSON } = render(<LoginForm />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("disables register button and does not call login for invalid email", async () => {
    mockLogin = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    fireEvent.changeText(getByPlaceholderText("Email"), "invalid-email");

    let button = getByText("Login");
    while (button && !button.props.onPress) {
      button = button.parent;
    }
    await waitFor(() => {
      expect(button.props.disabled).toBe(true);
    });

    fireEvent.press(getByText("Login"));
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login on valid submit", async () => {
    mockLogin = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");

    // Traverse up to the pressable button
    let button = getByText("Login");
    while (button && !button.props.onPress) {
      button = button.parent;
    }

    await waitFor(() => {
      expect(button.props.disabled).toBe(false);
    });

    fireEvent.press(button);
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com");
    });
  });
});
