import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeMessage from "../WelcomeMessage";

// Mock dependencies
jest.mock("@/redux/slices/apiSlice/endpoints/profile/getProfile", () => ({
  useGetProfileQuery: jest.fn(),
}));
jest.mock("@/features/dashboard/utils/getCustomGreeting", () =>
  jest.fn(() => "Hello, test!"),
);
jest.mock("@/components/UI/Text", () => ({
  __esModule: true,
  default: ({ children }: any) => {
    const { Text } = require("react-native");
    return <Text>{children}</Text>;
  },
}));
jest.mock("@/gluestack-ui/vstack", () => ({
  __esModule: true,
  VStack: ({ children }: any) => <>{children}</>,
}));

const {
  useGetProfileQuery,
} = require("@/redux/slices/apiSlice/endpoints/profile/getProfile");

describe("WelcomeMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    useGetProfileQuery.mockReturnValue({
      isFetching: true,
      isError: false,
      name: undefined,
    });
    const { getByTestId } = render(<WelcomeMessage />);
    expect(getByTestId("loading-box")).toBeTruthy();
  });

  it("shows error state", () => {
    useGetProfileQuery.mockReturnValue({
      isFetching: false,
      isError: true,
      name: undefined,
    });
    const { getByText } = render(<WelcomeMessage />);
    expect(getByText("Error loading profile")).toBeTruthy();
  });

  it("shows welcome message with name", () => {
    useGetProfileQuery.mockReturnValue({
      isFetching: false,
      isError: false,
      name: "Alex",
    });
    const { getByText } = render(<WelcomeMessage />);
    expect(getByText("Welcome Alex")).toBeTruthy();
  });

  it("shows custom greeting", () => {
    useGetProfileQuery.mockReturnValue({
      isFetching: false,
      isError: false,
      name: "Alex",
    });
    const { getByText } = render(<WelcomeMessage />);
    expect(getByText("Hello, test!")).toBeTruthy();
  });

  it("matches snapshot", () => {
    useGetProfileQuery.mockReturnValue({
      isFetching: false,
      isError: false,
      name: "Alex",
    });
    const tree = render(<WelcomeMessage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
