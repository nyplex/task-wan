import Text from "../Text";
import { Pressable } from "../gluestack/pressable";

type Props = {
  title: string;
  isToggled: boolean;
  disabled?: boolean;
  onPress?: (toggled: boolean) => void;
};

const ToggleButton = ({ title, isToggled, disabled, onPress }: Props) => {
  return (
    <Pressable
      role="button"
      disabled={disabled}
      onPress={() => {
        if (onPress) {
          onPress(!isToggled);
        }
      }}
      style={{
        backgroundColor: isToggled ? "#006EE9" : "transparent",
      }}
      className="w-full h-[48px] border border-primary-200 rounded-[10px] justify-center">
      <Text
        weight="medium"
        className={
          isToggled
            ? "text-center line-clamp-1 text-white"
            : "text-center line-clamp-1 text-primary-50"
        }>
        {title}
      </Text>
    </Pressable>
  );
};

export default ToggleButton;
