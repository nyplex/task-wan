import { render, userEvent } from "@testing-library/react-native";
import BackButtonIcon from "../BackButtonIcon";

describe("<BackButtonIcon />", () => {
  it("Renders the element correctly", () => {
    const { getByTestId } = render(<BackButtonIcon disabled={false} />);
    const pressable = getByTestId("BackButtonIcon");
    expect(pressable).toBeDefined();
    expect(pressable.props.className).toContain(
      "w-[36px] h-[36px] items-center justify-center bg-primary-0 rounded-[10px]"
    );
    expect(pressable.props.disabled).toBe(undefined);
  });

  it("disabled the element when the disabled prop is true", async () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <BackButtonIcon
        disabled
        onPress={onPressMock}
      />
    );

    const pressable = getByTestId("BackButtonIcon");
    expect(pressable.props.dataSet.disabled).toBeTruthy();
    await userEvent.press(pressable);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("handle the onPress event correctly", async () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<BackButtonIcon onPress={onPressMock} />);

    const pressable = getByTestId("BackButtonIcon");
    expect(pressable.props.dataSet.disabled).toBe("false");
    await userEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });
});
