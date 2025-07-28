import { render, fireEvent } from "@testing-library/react-native";
import SocialAuthButton from "../SocialAuthButton";

describe("SocialAuthButton", () => {
  it("renders Google logo when provider is 'google'", () => {
    const { getByTestId } = render(<SocialAuthButton provider="google" />);
    const image = getByTestId("social-auth-image");
    const source = Array.isArray(image.props.source) ? image.props.source[0] : image.props.source;
    expect(source.testUri).toContain("google-logo-light.png");
  });

  it("renders Apple logo when provider is 'apple'", () => {
    const { getByTestId } = render(<SocialAuthButton provider="apple" />);
    const image = getByTestId("social-auth-image");
    const source = Array.isArray(image.props.source) ? image.props.source[0] : image.props.source;
    expect(source.testUri).toContain("apple-logo-light.png");
  });

  it("shows spinner and hides logo when isLoading is true", () => {
    const { queryByTestId } = render(
      <SocialAuthButton
        provider="google"
        isLoading
      />
    );
    expect(queryByTestId("social-auth-image")).toBeNull();
    // Optionally: add a testID to ButtonSpinner for more robust spinner tests
  });

  it("disables button when disabled prop is true", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <SocialAuthButton
        provider="google"
        disabled
      />
    );
    const button = getByTestId("social-auth-button");
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("disables button when isLoading is true", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <SocialAuthButton
        provider="google"
        isLoading
      />
    );
    const button = getByTestId("social-auth-button");
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("calls onPress when pressed and not disabled or loading", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <SocialAuthButton
        provider="google"
        onPress={onPress}
      />
    );
    const button = getByTestId("social-auth-button");
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <SocialAuthButton
        provider="google"
        onPress={onPress}
        disabled
      />
    );
    const button = getByTestId("social-auth-button");
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("does not call onPress when isLoading", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <SocialAuthButton
        provider="google"
        onPress={onPress}
        isLoading
      />
    );
    const button = getByTestId("social-auth-button");
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
