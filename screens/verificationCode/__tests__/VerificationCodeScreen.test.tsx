import { render } from "@testing-library/react-native";
import VerificationCodeScreen from "../VerificationCodeScreen";
import React from "react";

// Do NOT mock gluestack components as requested
// Mock only child components to isolate VerificationCodeScreen
const Header = () => <></>;
Header.displayName = "Header";
const BodyContent = () => <></>;
BodyContent.displayName = "BodyContent";
const CodeForm = () => <></>;
CodeForm.displayName = "CodeForm";
const ResendCodeBtn = () => <></>;
ResendCodeBtn.displayName = "ResendCodeBtn";

jest.mock("../components/Header", () => ({ __esModule: true, default: Header }));
jest.mock("../components/BodyContent", () => ({ __esModule: true, default: BodyContent }));
jest.mock("../components/CodeForm", () => ({ __esModule: true, default: CodeForm }));
jest.mock("../components/ResendCodeBtn", () => ({ __esModule: true, default: ResendCodeBtn }));

describe("VerificationCodeScreen", () => {
  it("renders without crashing", () => {
    render(<VerificationCodeScreen />);
  });

  it("renders Header, BodyContent, CodeForm, and ResendCodeBtn", () => {
    const { UNSAFE_queryAllByType } = render(<VerificationCodeScreen />);
    expect(UNSAFE_queryAllByType(Header).length).toBe(1);
    expect(UNSAFE_queryAllByType(BodyContent).length).toBe(1);
    expect(UNSAFE_queryAllByType(CodeForm).length).toBe(1);
    expect(UNSAFE_queryAllByType(ResendCodeBtn).length).toBe(1);
  });

  it("matches the rendered output snapshot", () => {
    const { toJSON } = render(<VerificationCodeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
