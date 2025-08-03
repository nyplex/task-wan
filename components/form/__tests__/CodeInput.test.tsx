import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CodeInput from "../CodeInput";

describe("CodeInput", () => {
  it("renders the code field and all cells", () => {
    const { getByTestId } = render(
      <CodeInput onValueChange={() => {}} currentValue="" />,
    );
    expect(getByTestId("code-input-field")).toBeTruthy();
    for (let i = 0; i < 6; i++) {
      expect(getByTestId(`code-input-cell-${i}`)).toBeTruthy();
    }
  });

  it("renders the correct value in cells", () => {
    const value = "123456";
    const { getAllByText } = render(
      <CodeInput onValueChange={() => {}} currentValue={value} />,
    );
    for (const digit of value.split("")) {
      expect(getAllByText(digit).length).toBeGreaterThan(0);
    }
  });

  it("calls onValueChange when input changes", () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <CodeInput onValueChange={onValueChange} currentValue="" />,
    );
    fireEvent.changeText(getByTestId("code-input-field"), "123456");
    expect(onValueChange).toHaveBeenCalledWith("123456");
  });

  it("applies invalid styles to cells when invalid is true", () => {
    const { getByTestId } = render(
      <CodeInput onValueChange={() => {}} currentValue="1" invalid />,
    );
    const cell = getByTestId("code-input-cell-0");
    // Check that the style array contains the invalid border color
    const styleArray = Array.isArray(cell.props.style)
      ? cell.props.style
      : [cell.props.style];
    const hasInvalidBorder = styleArray.some(
      (style: any) => style && style.borderBottomColor === "#FF0000",
    );
    expect(hasInvalidBorder).toBe(true);
  });

  it("is not editable when disabled is true", () => {
    const { getByTestId } = render(
      <CodeInput onValueChange={() => {}} currentValue="" disabled />,
    );
    expect(getByTestId("code-input-field").props.editable).toBe(false);
  });
});
