import React from "react";
import { render } from "@testing-library/react-native";
import LoginThirdParty from "../components/LoginThirdParty";

describe("LoginThirdParty", () => {
  it("renders two SocialAuthButton components", () => {
    const { getAllByTestId } = render(<LoginThirdParty />);
    // SocialAuthButton should have testID="social-auth-button"
    expect(getAllByTestId("social-auth-button").length).toBe(2);
  });

  it("matches the snapshot", () => {
    const { toJSON } = render(<LoginThirdParty />);
    expect(toJSON()).toMatchSnapshot();
  });
});
