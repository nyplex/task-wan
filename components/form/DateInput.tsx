import Text from "../Text";
import Icon from "../UI/Icon";
import { HStack } from "../gluestack/hstack";
import { Pressable } from "../gluestack/pressable";

type Props = {
  timestamp: number;
  disabled?: boolean;
  onPress?: () => void;
};

const DateInput = ({ timestamp, disabled, onPress }: Props) => {
  const getFormattedDate = () => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <Pressable
      role="button"
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: disabled ? "#EEF5FD" : "#FFFFFF",
      }}
      className="w-full h-[48px] justify-center px-4 border-[1px] border-primary-700 rounded-[10px]"
    >
      <HStack className="items-center gap-2">
        <Icon icon="calendar" size="large" />
        <Text size="bodyS" weight="medium">
          {getFormattedDate()}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default DateInput;
