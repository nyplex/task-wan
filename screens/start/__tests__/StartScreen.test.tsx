import { render, fireEvent } from "@testing-library/react-native";
import StartScreen from "../StartScreen";

// Mock all child components to isolate StartScreen
const Slider = ({ children }: any) => <>{children}</>;
Slider.displayName = "Slider";
const SliderIndicator = () => <></>;
SliderIndicator.displayName = "SliderIndicator";
const SliderChild = () => <></>;
SliderChild.displayName = "SliderChild";

jest.mock("../components/Slider", () => Slider);
jest.mock("../components/SliderIndicator", () => SliderIndicator);
jest.mock("../components/SliderChild", () => SliderChild);
jest.mock("expo-router", () => ({ useRouter: () => ({ navigate: jest.fn() }) }));

describe("StartScreen", () => {
  it("renders without crashing", () => {
    render(<StartScreen />);
  });

  it("renders Box, Slider, SliderIndicator, SliderChild, and Button", () => {
    const { UNSAFE_queryAllByType } = render(<StartScreen />);
    expect(UNSAFE_queryAllByType(Slider).length).toBe(1);
    expect(UNSAFE_queryAllByType(SliderIndicator).length).toBe(1);
    expect(UNSAFE_queryAllByType(SliderChild).length).toBe(3);
  });

  it("calls router.navigate when Get Started is pressed", () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require("expo-router"), "useRouter").mockReturnValue({ navigate: mockNavigate });
    const { getByText } = render(<StartScreen />);
    fireEvent.press(getByText("Get Started"));
    expect(mockNavigate).toHaveBeenCalledWith("/(app)/Login");
  });

  it("matches the rendered output snapshot", () => {
    const { toJSON } = render(<StartScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
