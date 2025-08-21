import { render } from "@testing-library/react-native";
import RegisterScreen from "../RegisterScreen";

// Mock all child components to isolate RegisterScreen
const Header = () => <></>;
Header.displayName = "Header";
const RegisterForm = () => <></>;
RegisterForm.displayName = "RegisterForm";
const Divider = () => <></>;
Divider.displayName = "Divider";
const SocialAuthButton = () => <></>;
SocialAuthButton.displayName = "SocialAuthButton";

jest.mock("../components/Header", () => Header);
jest.mock("../components/RegisterForm", () => RegisterForm);
jest.mock("@/components/layout/Divider", () => Divider);
jest.mock("@/components/buttons/SocialAuthButton", () => SocialAuthButton);

describe("RegisterScreen", () => {
  it("renders without crashing", () => {
    render(<RegisterScreen />);
    // No error thrown means pass
  });

  it("renders Header, RegisterForm, Divider, and SocialAuthButtons", () => {
    const { UNSAFE_queryAllByType } = render(<RegisterScreen />);
    expect(UNSAFE_queryAllByType(Header).length).toBe(1);
    expect(UNSAFE_queryAllByType(RegisterForm).length).toBe(1);
    expect(UNSAFE_queryAllByType(Divider).length).toBe(1);
    expect(UNSAFE_queryAllByType(SocialAuthButton).length).toBe(2);
  });

  it("renders the register prompt text", () => {
    const { getByText } = render(<RegisterScreen />);
    expect(getByText("Create your account")).toBeTruthy();
  });

  it("matches the rendered output snapshot", () => {
    const { toJSON } = render(<RegisterScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
