import { VStack } from "@/gluestack-ui/vstack";
import { HStack } from "@/gluestack-ui/hstack";
import { Pressable } from "@/gluestack-ui/pressable";
import { Box } from "@/gluestack-ui/box";
import { clsx } from "clsx";
import Icon from "../UI/Icon";
import Text from "../primitives/Text";

type Props = {
  isInvalid?: boolean;
  isDisabled?: boolean;
  value?: string;
  placeholder?: string;
  invalidText?: string;
  onPress?: () => void;
};

const InputCalendar = ({
  isInvalid,
  isDisabled,
  value,
  placeholder,
  invalidText,
  onPress,
}: Props) => {
  const CNInput = clsx("text-buttons-text flex-1", {
    "h-[48px] rounded-r-[10px]": true,
    "border-primary-700 border-[1px]": true,
    "border-l-0": true,
    "border-primary-700 data-[focus=true]:border-primary-0": !isInvalid,
    "border-[#C6C2C2]": isDisabled,
    "border-error data-[focus=true]:border-error": isInvalid && !isDisabled,
    "justify-center pl-2": true,
  });

  const CNIconBox = clsx("h-[48px] w-[50px] justify-center items-center", {
    "bg-primary-0": !isInvalid,
    "bg-[#C6C2C2]": isDisabled,
    "bg-error": isInvalid && !isDisabled,
    "rounded-l-[10px]": true,
  });

  return (
    <Pressable onPress={onPress} disabled={isDisabled} testID="input-pressable">
      <VStack>
        <HStack className="items-center">
          <Box className={CNIconBox}>
            <Icon icon="calendar" size="medium" color="white" disabled />
          </Box>
          <Box className={CNInput}>
            <Text>{value ? value : placeholder}</Text>
          </Box>
        </HStack>
        <Box>
          <Text
            className="text-right px-2 text-red-500 line-clamp-1"
            size="bodyXS"
            weight="medium"
          >
            {isInvalid && invalidText ? invalidText : ""}
          </Text>
        </Box>
      </VStack>
    </Pressable>
  );
};

export default InputCalendar;
