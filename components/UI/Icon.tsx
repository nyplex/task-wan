import Feather from "@expo/vector-icons/Feather";

export type IconList =
  | "mail"
  | "lock"
  | "user"
  | "arrow-left"
  | "arrow-right"
  | "bell"
  | "x-circle"
  | "calendar"
  | "plus-circle"
  | "bar-chart-2"
  | "map-pin"
  | "settings"
  | "log-out"
  | "life-buoy"
  | "info"
  | "users"
  | "more-horizontal"
  | "edit-2"
  | "check";

type Props = {
  icon: IconList;
  size?: "small" | "medium" | "large";
  color?: "primary" | "white";
  disabled?: boolean;
  onPress?: () => void;
};

const Icon = ({ icon, size = "medium", color, disabled, onPress }: Props) => {
  return (
    <Feather
      testID="icon"
      name={icon}
      size={size === "small" ? 12 : size === "medium" ? 16 : size === "large" ? 24 : 24}
      color={color === "primary" ? "#006EE9" : color === "white" ? "#fff" : "#006EE9"}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default Icon;
