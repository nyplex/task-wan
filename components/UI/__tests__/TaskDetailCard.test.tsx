import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskDetailCard from "../TaskDetailCard";

describe("TaskDetailCard", () => {
  const props = {
    taskId: "task123",
    title: "Task Title",
    description: "This is the task description.",
    startDate: new Date("2024-01-01").getTime(),
    endDate: new Date("2024-01-31").getTime(),
  };

  it("renders title, description, and formatted dates", () => {
    const { getByText } = render(<TaskDetailCard {...props} />);
    expect(getByText(props.title)).toBeTruthy();
    expect(getByText(props.description)).toBeTruthy();

    // Dates formatted as "DD MMM YY"
    expect(getByText("01 Jan 24 - 31 Jan 24")).toBeTruthy();
  });

  it("calls onPress with taskId when pressed", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <TaskDetailCard
        {...props}
        onPress={onPress}
      />
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledWith(props.taskId);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <TaskDetailCard
        {...props}
        onPress={onPress}
        disabled
      />
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("calls onPressMore with taskId when more icon pressed", () => {
    const onPressMore = jest.fn();
    const { getByTestId } = render(
      <TaskDetailCard
        {...props}
        onPressMore={onPressMore}
      />
    );

    fireEvent.press(getByTestId("icon"));
    expect(onPressMore).toHaveBeenCalledWith(props.taskId);
  });

  it("does not call onPressMore if taskId is not provided", () => {
    const onPressMore = jest.fn();
    const { getByTestId } = render(
      <TaskDetailCard
        {...props}
        taskId={undefined}
        onPressMore={onPressMore}
      />
    );

    fireEvent.press(getByTestId("icon"));
    expect(onPressMore).not.toHaveBeenCalled();
  });
});
