import { jest } from "@jest/globals";

const Reanimated = require("react-native-reanimated/mock");

Reanimated.withTiming = (value) => value;
Reanimated.useSharedValue = (val) => ({ value: val });
Reanimated.useAnimatedProps = (cb) => cb();

process.env.EXPO_PUBLIC_SUPABASE_URL = "http://localhost:54321";
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = "test_anon_key";

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

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  // Add other methods as needed
}));
