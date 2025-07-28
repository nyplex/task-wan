import { render } from "@testing-library/react-native";
import LoginScreen from "../LoginScreen";

// Mock all child components to isolate LoginScreen
const AppTitle = () => <></>;
AppTitle.displayName = "AppTitle";
const LoginForm = () => <></>;
LoginForm.displayName = "LoginForm";
const LoginDivider = () => <></>;
LoginDivider.displayName = "LoginDivider";
const LoginThirdParty = () => <></>;
LoginThirdParty.displayName = "LoginThirdParty";
const LoginFooter = () => <></>;
LoginFooter.displayName = "LoginFooter";

jest.mock("../components/LoginForm", () => LoginForm);
jest.mock("../components/LoginDivider", () => LoginDivider);
jest.mock("../components/LoginThirdParty", () => LoginThirdParty);
jest.mock("../components/LoginFooter", () => LoginFooter);
jest.mock("@/components/UI/AppTitle", () => AppTitle);
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));
jest.mock("react-native-keyboard-controller", () => ({
  useReanimatedKeyboardAnimation: () => ({ progress: { value: 0 } }),
}));

describe("LoginScreen", () => {
  it("renders without crashing", () => {
    render(<LoginScreen />);
    // No error thrown means pass
  });

  it("renders AppTitle, LoginForm, LoginDivider, LoginThirdParty, and LoginFooter", () => {
    const { UNSAFE_queryAllByType } = render(<LoginScreen />);
    expect(UNSAFE_queryAllByType(AppTitle).length).toBe(1);
    expect(UNSAFE_queryAllByType(LoginForm).length).toBe(1);
    expect(UNSAFE_queryAllByType(LoginDivider).length).toBe(1);
    expect(UNSAFE_queryAllByType(LoginThirdParty).length).toBe(1);
    expect(UNSAFE_queryAllByType(LoginFooter).length).toBe(1);
  });

  it("renders the login prompt text", () => {
    const { getByText } = render(<LoginScreen />);
    expect(getByText("Login to your account")).toBeTruthy();
  });

  it("matches the root structure snapshot", () => {
    const { getByTestId } = render(<LoginScreen />);
    const root = getByTestId("login-screen-root");
    expect(root.props.className).toContain("flex-1");
  });

  it("matches the rendered output snapshot", () => {
    const { toJSON } = render(<LoginScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
