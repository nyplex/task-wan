import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import Header from "../components/Header";

// Mocks
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@/components/UI/AppTitle", () => {
  const { Text } = require("react-native");
  return () => <Text testID="AppTitle">App Title</Text>;
});

describe("Header", () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    (useSelector as unknown as jest.Mock).mockReturnValue(false); // isLoading
    jest.clearAllMocks();
  });

  it("renders AppTitle", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("AppTitle")).toBeTruthy();
  });

  it("calls router.back when BackButton is pressed", () => {
    const { getByTestId } = render(<Header />);
    fireEvent.press(getByTestId("BackButtonIcon"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("disables BackButton when isLoading is true", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(true); // isLoading = true
    const { getByTestId } = render(<Header />);

    let button = getByTestId("BackButtonIcon");
    while (button && !button.props.onPress) {
      button = button.parent;
    }
    await waitFor(() => {
      expect(button.props.disabled).toBe(true);
    });

    fireEvent.press(getByTestId("BackButtonIcon"));
    expect(mockBack).not.toHaveBeenCalled();
  });
});
