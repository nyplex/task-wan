import { render, fireEvent, act } from "@testing-library/react-native";
import Avatar from "../Avatar";

describe("<Avatar />", () => {
  it("renders fallback name correctly", () => {
    const { getByTestId } = render(<Avatar fallbackName="Alex Nypels" />);
    expect(getByTestId("avatar-fallback").props.children).toBe("AN");
  });

  it("renders avatar image if avatarURL is provided", () => {
    const avatarURL = "https://example.com/avatar.jpg";
    const { getByTestId } = render(<Avatar avatarURL={avatarURL} />);
    const image = getByTestId("avatar-image");
    expect(image.props.source.uri).toBe(avatarURL);
  });

  it("renders edit icon if editable is true", () => {
    const { getByTestId } = render(
      <Avatar
        editable
        fallbackName="AB"
      />
    );
    expect(getByTestId("avatar-edit-icon-wrapper")).toBeTruthy();
  });

  it("calls onPress when pressed and not disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Avatar
        fallbackName="AB"
        onPress={onPressMock}
      />
    );
    act(() => {
      fireEvent.press(getByTestId("avatar-pressable"));
    });
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Avatar
        fallbackName="AB"
        onPress={onPressMock}
        disabled
      />
    );
    act(() => {
      fireEvent.press(getByTestId("avatar-pressable"));
    });
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
