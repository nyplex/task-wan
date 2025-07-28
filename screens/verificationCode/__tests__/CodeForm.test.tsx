import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CodeForm from "../components/CodeForm";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import useAuth from "@/hooks/useAuth";

// Mocks
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/components/form/CodeInput", () => {
  const { TextInput } = require("react-native");
  return ({ onValueChange, currentValue, disabled }: any) => (
    <TextInput
      testID="CodeInput"
      value={currentValue}
      editable={!disabled}
      onChangeText={onValueChange}
    />
  );
});

describe("CodeForm", () => {
  const mockVerifyOTP = jest.fn();

  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockReturnValue(false); // isLoading
    (useLocalSearchParams as jest.Mock).mockReturnValue({ email: "test@example.com" });
    (useAuth as jest.Mock).mockReturnValue({ verifyOTP: mockVerifyOTP });
    jest.clearAllMocks();
  });

  it("renders CodeInput", () => {
    const { getByTestId } = render(<CodeForm />);
    expect(getByTestId("CodeInput")).toBeTruthy();
  });

  it("calls verifyOTP when 6-digit code is entered", async () => {
    const { getByTestId } = render(<CodeForm />);
    const input = getByTestId("CodeInput");

    fireEvent.changeText(input, "123456");

    await waitFor(() => {
      expect(mockVerifyOTP).toHaveBeenCalledWith("123456", "test@example.com");
    });
  });

  it("does not call verifyOTP if code is less than 6 digits", async () => {
    const { getByTestId } = render(<CodeForm />);
    const input = getByTestId("CodeInput");

    fireEvent.changeText(input, "12345");

    await waitFor(() => {
      expect(mockVerifyOTP).not.toHaveBeenCalled();
    });
  });

  it("disables CodeInput when isLoading is true", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(true); // isLoading = true
    const { getByTestId } = render(<CodeForm />);
    const input = getByTestId("CodeInput");
    expect(input.props.editable).toBe(false);
  });
});
