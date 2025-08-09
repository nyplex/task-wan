import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DatePicker from "../DatePicker";

// Mock the CalendarModal with testID and props handling
jest.mock("../../UI/CalendarModal", () => {
  const compoenent = ({
    isOpen,
    onSelect,
    onClose,
  }: {
    isOpen: boolean;
    onSelect: (date: number) => void;
    onClose: () => void;
  }) => {
    const { View, Text, Button } = require("react-native");
    return isOpen ? (
      <View testID="calendar-modal">
        <Text>Calendar Modal</Text>
        <Button
          testID="select-date"
          title="Select Date"
          onPress={() => onSelect(1234567890000)}
        />
        <Button testID="close-modal" title="Close" onPress={onClose} />
      </View>
    ) : null;
  };
  compoenent.displayName = "CalendarModal";
  return compoenent;
});

describe("DatePicker Component", () => {
  const mockOnDateChange = jest.fn();
  const mockDate = new Date(2023, 9, 1).getTime(); // Oct 1, 2023

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with formatted date", () => {
    const { getByText } = render(
      <DatePicker currentDate={mockDate} onDateChange={mockOnDateChange} />,
    );

    expect(getByText("Oct, 2023")).toBeTruthy();
  });

  it("opens calendar modal on press", () => {
    const { getByText, queryByTestId } = render(
      <DatePicker currentDate={mockDate} onDateChange={mockOnDateChange} />,
    );

    expect(queryByTestId("calendar-modal")).toBeNull();
    fireEvent.press(getByText("Oct, 2023"));
    expect(queryByTestId("calendar-modal")).toBeTruthy();
  });

  it("calls onDateChange and closes modal on date selection", () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <DatePicker currentDate={mockDate} onDateChange={mockOnDateChange} />,
    );

    fireEvent.press(getByText("Oct, 2023")); // open modal
    expect(queryByTestId("calendar-modal")).toBeTruthy();

    fireEvent.press(getByTestId("select-date"));
    expect(mockOnDateChange).toHaveBeenCalledWith(1234567890000);
    // Modal should close after selection
    expect(queryByTestId("calendar-modal")).toBeNull();
  });

  it("closes calendar modal on cancel/close", () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <DatePicker currentDate={mockDate} onDateChange={mockOnDateChange} />,
    );

    fireEvent.press(getByText("Oct, 2023")); // open modal
    expect(queryByTestId("calendar-modal")).toBeTruthy();

    fireEvent.press(getByTestId("close-modal"));
    expect(queryByTestId("calendar-modal")).toBeNull();
    expect(mockOnDateChange).not.toHaveBeenCalled();
  });

  it("does not open modal if disabled", () => {
    const { queryByTestId, getByText } = render(
      <DatePicker
        currentDate={mockDate}
        onDateChange={mockOnDateChange}
        disabled
      />,
    );

    fireEvent.press(getByText("Oct, 2023"));
    expect(queryByTestId("calendar-modal")).toBeNull();
  });
});
