import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import ResendCodeBtn from "../components/ResendCodeBtn"; // Adjust path as needed
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

jest.useFakeTimers();

describe("ResendCodeBtn", () => {
  const mockResendOTP = jest.fn(() => Promise.resolve());
  const mockEmail = "test@example.com";

  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ email: mockEmail });
    (useAuth as jest.Mock).mockReturnValue({ resendOTP: mockResendOTP });
    (useSelector as unknown as jest.Mock).mockReturnValue(false); // isLoading
    jest.clearAllMocks();
  });

  it("renders countdown initially and disables button", () => {
    const { getByText } = render(<ResendCodeBtn />);
    expect(getByText(/Resend code in 60s/i)).toBeTruthy();
    expect(getByText(/Resend code in/i).props.disabled).toBe(true);
  });

  it("counts down and eventually enables the button", () => {
    const { getByText } = render(<ResendCodeBtn />);
    for (let i = 60; i > 0; i--) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }
    expect(getByText("Resend Code")).toBeTruthy();
    expect(getByText("Resend Code").props.disabled).toBe(false);
  });

  it("calls resendOTP when pressed after countdown", async () => {
    const { getByText } = render(<ResendCodeBtn />);
    for (let i = 60; i > 0; i--) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    await act(async () => {
      fireEvent.press(getByText("Resend Code"));
    });

    expect(mockResendOTP).toHaveBeenCalledWith(mockEmail);
    expect(getByText("Code sent")).toBeTruthy();
  });

  it("displays 'Resending...' while waiting", async () => {
    mockResendOTP.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 1000); // simulate network delay
        }),
    );

    const { getByText } = render(<ResendCodeBtn />);
    // Tick countdown to zero
    for (let i = 60; i > 0; i--) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    await act(async () => {
      fireEvent.press(getByText("Resend Code"));
    });

    expect(getByText("Resending...")).toBeTruthy();
  });

  it("disables button after resend", async () => {
    mockResendOTP.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 1000); // simulate network delay
        }),
    );

    const { getByText } = render(<ResendCodeBtn />);

    // Tick countdown to zero
    for (let i = 60; i > 0; i--) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    // Wait for "Resend Code"
    const button = await waitFor(() => getByText("Resend Code"));

    // Trigger resend
    await act(async () => {
      fireEvent.press(button);
    });

    // Advance time to let resendOTP resolve
    await act(async () => {
      jest.advanceTimersByTime(1000); // resolves resendOTP
    });

    // Wait for "Code sent"
    const sent = await waitFor(() => getByText("Code sent"));

    expect(sent).toBeTruthy();
    expect(sent.props.disabled).toBe(true);
  });
});
