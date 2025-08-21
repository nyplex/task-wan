import { Pressable } from "@/gluestack-ui/pressable";
import { HStack } from "@/gluestack-ui/hstack";
import Text from "@/components/UI/Text";
import Icon from "@/components/UI/Icon";

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
