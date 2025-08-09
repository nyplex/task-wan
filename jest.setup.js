import { jest } from "@jest/globals";

const Reanimated = require("react-native-reanimated/mock");

Reanimated.withTiming = (value) => value;
Reanimated.useSharedValue = (val) => ({ value: val });
Reanimated.useAnimatedProps = (cb) => cb();

// ✅ This mock will now be global
jest.mock("@expo/vector-icons/Feather", () => {
  const { Text } = require("react-native");
  const FeatherMock = (props) => (
    <Text testID="feather-icon" {...props}>
      Feather Icon
    </Text>
  );
  FeatherMock.displayName = "FeatherMock";
  return FeatherMock;
});

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);
