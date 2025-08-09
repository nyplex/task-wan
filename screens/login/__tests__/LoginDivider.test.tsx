import React from "react";
import { render } from "@testing-library/react-native";
import LoginDivider from "../components/LoginDivider";

describe("LoginDivider", () => {
  it("renders correctly and matches snapshot", () => {
    const { toJSON, getByText } = render(<LoginDivider />);
    expect(getByText("Or login with")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders Divider inside HStack", () => {
    const { getByText, getByTestId } = render(<LoginDivider />);
    const divider = getByText("Or login with");
    const parent = getByTestId("login-divider");
    expect(divider).toBeTruthy();
    expect(parent.props.className).toContain("items-center");
  });
});
