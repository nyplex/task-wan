import React from "react";
import { render, act } from "@testing-library/react-native";
import TaskTimer from "../TaskTimer";
import dayjs from "dayjs";

jest.useFakeTimers();

describe("TaskTimer", () => {
  const fixedDate = new Date().getTime();

  beforeAll(() => {
    // Mock global Date.now()
    jest.spyOn(global.Date, "now").mockImplementation(() => fixedDate);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("renders months, days, hours, and minutes correctly when timestamp is in the future with months left", () => {
    const now = dayjs(fixedDate);
    const future = now.add(1, "month").add(5, "days").add(3, "hour").add(10, "minute").valueOf();

    const { getByText, queryByText } = render(<TaskTimer timestamp={future} />);

    expect(getByText("1")).toBeTruthy(); // months
    expect(getByText("Months")).toBeTruthy();

    expect(getByText("5")).toBeTruthy(); // days
    expect(getByText("Days")).toBeTruthy();

    expect(getByText("3")).toBeTruthy(); // hours
    expect(getByText("Hours")).toBeTruthy();

    expect(queryByText("Minutes")).toBeNull(); // no minutes box when months > 0
  });

  it("renders days, hours, and minutes correctly when less than one month left", () => {
    const now = dayjs(fixedDate);
    const future = now.add(10, "day").add(2, "hour").add(15, "minute").valueOf();

    const { getByText, queryByText } = render(<TaskTimer timestamp={future} />);

    expect(queryByText("Months")).toBeNull();

    expect(getByText("10")).toBeTruthy();
    expect(getByText("Days")).toBeTruthy();

    expect(getByText("2")).toBeTruthy();
    expect(getByText("Hours")).toBeTruthy();

    expect(getByText("15")).toBeTruthy();
    expect(getByText("Minutes")).toBeTruthy();
  });

  it("renders all zeros when timestamp is in the past", () => {
    const now = dayjs(fixedDate);
    const past = now.subtract(1, "day").valueOf();

    const { getByText, queryByText, getAllByText } = render(<TaskTimer timestamp={past} />);

    expect(queryByText("Months")).toBeNull();

    expect(getAllByText("0")).toHaveLength(3);
    expect(getByText("Days")).toBeTruthy();
    expect(getByText("Hours")).toBeTruthy();
    expect(getByText("Minutes")).toBeTruthy();
  });

  it("updates timer every minute", () => {
    const now = dayjs(fixedDate);
    const future = now.add(1, "minute").valueOf();

    const { getAllByText } = render(<TaskTimer timestamp={future} />);

    expect(getAllByText("0")).toHaveLength(2);

    // Advance timers by one minute
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(getAllByText("0")).toHaveLength(3);
  });
});
