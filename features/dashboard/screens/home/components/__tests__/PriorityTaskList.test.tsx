import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PriorityTaskList from "../PriorityTaskList";

// Mock expo-router
const mockNavigate = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock FlashList
jest.mock("@shopify/flash-list", () => ({
  FlashList: ({ data, renderItem, ListEmptyComponent, ...props }: any) => {
    const { View } = require("react-native");
    if (!data || data.length === 0) {
      return <View testID="flash-list-empty">{ListEmptyComponent}</View>;
    }
    return (
      <View testID="flash-list" {...props}>
        {data.map((item: any, index: number) => (
          <View key={index} testID={`flash-list-item-${index}`}>
            {renderItem({ item, index })}
          </View>
        ))}
      </View>
    );
  },
}));

// Mock utility functions
jest.mock("@/features/dashboard/utils/getTimeLeft", () => ({
  getTimeLeft: jest.fn(() => `${Math.floor(Math.random() * 10)} days left`),
}));

jest.mock("@/features/dashboard/utils/getTaskProgress", () => ({
  getTaskProgress: jest.fn(() => Math.floor(Math.random() * 100)),
}));

// Mock hook
const mockUseGetPriorityTasks = jest.fn();
jest.mock("@/features/dashboard/hooks/useGetPriorityTasks", () => ({
  __esModule: true,
  default: () => mockUseGetPriorityTasks(),
}));

// Mock components
jest.mock("@/components/UI/PriorityTaskCard", () => {
  const { TouchableOpacity, Text } = require("react-native");
  const MockPriorityTaskCard = ({
    title,
    timeLeft,
    progress,
    bgColor,
    onPress,
  }: any) => (
    <TouchableOpacity testID="priority-task-card" onPress={onPress}>
      <Text testID="task-title">{title}</Text>
      <Text testID="task-time-left">{timeLeft}</Text>
      <Text testID="task-progress">{progress}%</Text>
      <Text testID="task-bg-color">{bgColor}</Text>
    </TouchableOpacity>
  );
  MockPriorityTaskCard.displayName = "MockPriorityTaskCard";
  return MockPriorityTaskCard;
});

jest.mock("@/gluestack-ui/box", () => {
  const { View } = require("react-native");
  return {
    Box: ({ children, ...props }: any) => (
      <View {...props} testID="box">
        {children}
      </View>
    ),
  };
});

jest.mock("@/components/UI/Text", () => {
  const { Text: RNText } = require("react-native");
  const MockText = ({ children, ...props }: any) => (
    <RNText {...props} testID="text">
      {children}
    </RNText>
  );
  MockText.displayName = "MockText";
  return MockText;
});

jest.mock("../PriorityTasksLoader", () => {
  const { View, Text } = require("react-native");
  const MockPriorityTasksLoader = () => (
    <View testID="priority-tasks-loader">
      <Text>Loading...</Text>
    </View>
  );
  MockPriorityTasksLoader.displayName = "MockPriorityTasksLoader";
  return MockPriorityTasksLoader;
});

jest.mock("../EmptyPriorityTask", () => {
  const { View, Text } = require("react-native");
  const MockEmptyPriorityTask = () => (
    <View testID="empty-priority-task">
      <Text>No priority tasks</Text>
    </View>
  );
  MockEmptyPriorityTask.displayName = "MockEmptyPriorityTask";
  return MockEmptyPriorityTask;
});

describe("PriorityTaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTasks = [
    {
      id: "1",
      title: "Complete project",
      end_date: "2025-09-15",
    },
    {
      id: "2",
      title: "Review code",
      end_date: "2025-09-10",
    },
    {
      id: "3",
      title: null, // Test null title
      end_date: "2025-09-20",
    },
  ];

  it("renders title correctly", () => {
    mockUseGetPriorityTasks.mockReturnValue({
      tasks: [],
      isLoading: false,
    });

    const { getByText } = render(<PriorityTaskList />);
    expect(getByText("My Priority Task")).toBeTruthy();
  });

  it("shows loader when loading", () => {
    mockUseGetPriorityTasks.mockReturnValue({
      tasks: [],
      isLoading: true,
    });

    const { getByTestId } = render(<PriorityTaskList />);
    expect(getByTestId("priority-tasks-loader")).toBeTruthy();
  });

  it("shows empty state when no tasks and not loading", () => {
    mockUseGetPriorityTasks.mockReturnValue({
      tasks: [],
      isLoading: false,
    });

    const { getByTestId } = render(<PriorityTaskList />);
    expect(getByTestId("empty-priority-task")).toBeTruthy();
  });

  it("renders tasks when available", () => {
    mockUseGetPriorityTasks.mockReturnValue({
      tasks: mockTasks,
      isLoading: false,
    });

    const { getAllByTestId, getByText } = render(<PriorityTaskList />);

    const taskCards = getAllByTestId("priority-task-card");
    expect(taskCards).toHaveLength(3);

    expect(getByText("Complete project")).toBeTruthy();
    expect(getByText("Review code")).toBeTruthy();
    expect(getByText("No Title")).toBeTruthy(); // Tests fallback for null title
  });

  it("handles task with null title", () => {
    const tasksWithNullTitle = [
      {
        id: "1",
        title: null,
        end_date: "2025-09-15",
      },
    ];

    mockUseGetPriorityTasks.mockReturnValue({
      tasks: tasksWithNullTitle,
      isLoading: false,
    });

    const { getByText } = render(<PriorityTaskList />);
    expect(getByText("No Title")).toBeTruthy();
  });

  it("navigates to task detail when card is pressed", () => {
    mockUseGetPriorityTasks.mockReturnValue({
      tasks: mockTasks,
      isLoading: false,
    });

    const { getAllByTestId } = render(<PriorityTaskList />);

    const firstTaskCard = getAllByTestId("priority-task-card")[0];
    fireEvent.press(firstTaskCard);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: "/(root)/(priorityTask)/[taskID]",
      params: { taskID: "1" },
    });
  });

  it("generates consistent background colors for same task ID", () => {
    const taskWithSameId = [
      { id: "123", title: "Task 1", end_date: "2025-09-15" },
      { id: "123", title: "Task 2", end_date: "2025-09-16" },
    ];

    mockUseGetPriorityTasks.mockReturnValue({
      tasks: taskWithSameId,
      isLoading: false,
    });

    const { getAllByTestId } = render(<PriorityTaskList />);

    const bgColors = getAllByTestId("task-bg-color");
    expect(bgColors[0].children[0]).toBe(bgColors[1].children[0]);
  });

  it("generates different background colors for different task IDs", () => {
    const tasksWithDifferentIds = [
      { id: "abc", title: "Task 1", end_date: "2025-09-15" },
      { id: "xyz", title: "Task 2", end_date: "2025-09-16" },
    ];

    mockUseGetPriorityTasks.mockReturnValue({
      tasks: tasksWithDifferentIds,
      isLoading: false,
    });

    const { getAllByTestId } = render(<PriorityTaskList />);

    const bgColors = getAllByTestId("task-bg-color");
    expect(bgColors[0].children[0]).not.toBe(bgColors[1].children[0]);
  });

  it("handles undefined tasks gracefully", () => {
    mockUseGetPriorityTasks.mockReturnValue({
      tasks: undefined,
      isLoading: false,
    });

    const { getByTestId } = render(<PriorityTaskList />);
    expect(getByTestId("empty-priority-task")).toBeTruthy();
  });

  it("passes correct props to PriorityTaskCard", () => {
    const singleTask = [mockTasks[0]];

    mockUseGetPriorityTasks.mockReturnValue({
      tasks: singleTask,
      isLoading: false,
    });

    const { getByTestId } = render(<PriorityTaskList />);

    expect(getByTestId("task-title")).toBeTruthy();
    expect(getByTestId("task-time-left")).toBeTruthy();
    expect(getByTestId("task-progress")).toBeTruthy();
    expect(getByTestId("task-bg-color")).toBeTruthy();
  });

  it("renders with correct structure and styling classes", () => {
    mockUseGetPriorityTasks.mockReturnValue({
      tasks: mockTasks,
      isLoading: false,
    });

    const { getAllByTestId } = render(<PriorityTaskList />);

    const boxes = getAllByTestId("box");
    expect(boxes.length).toBeGreaterThan(0);

    const texts = getAllByTestId("text");
    expect(texts.length).toBeGreaterThan(0);
  });
});
