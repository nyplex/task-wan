import { KeyboardType } from "react-native";
import { Box } from "@/components/gluestack/box";
import { VStack } from "../gluestack/vstack";
import { Input as InputGS, InputField } from "@/components/gluestack/input";
import { HStack } from "@/components/gluestack/hstack";
import Icon, { IconList } from "../UI/Icon";
import Text from "../Text";
import clsx from "clsx";

type Props = {
  isInvalid?: boolean;
  isDisabled?: boolean;
  value?: string;
  placeholder?: string;
  leftIcon?: IconList;
  maxLength?: number;
  keyboardType?: KeyboardType;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  invalidText?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

const Input = ({
  isInvalid,
  isDisabled,
  value,
  placeholder,
  leftIcon,
  maxLength,
  keyboardType,
  autoCapitalize,
  secureTextEntry = false,
  autoCorrect = true,
  invalidText,
  onChangeText,
  onBlur,
  onFocus,
}: Props) => {
  const CNInput = clsx("text-buttons-text flex-1", {
    "h-[48px] rounded-r-[10px]": true,
    "border-primary-700 data-[focus=true]:border-primary-0": !isInvalid,
    "border-[#C6C2C2]": isDisabled,
    "border-error data-[focus=true]:border-error": isInvalid && !isDisabled,
    "rounded-l-[10px]": !leftIcon,
    "rounded-l-none": !!leftIcon,
    "border-r-1": true,
    "border-l-0": !!leftIcon,
    "border-l-1": !leftIcon,
  });

  const CNIconBox = clsx("h-[48px] w-[50px] justify-center items-center", {
    "bg-primary-0": !isInvalid,
    "bg-[#C6C2C2]": isDisabled,
    "bg-error": isInvalid && !isDisabled,
    "rounded-l-[10px]": true,
  });

  return (
    <VStack>
      <HStack>
        {leftIcon && (
          <Box className={CNIconBox}>
            <Icon
              icon={leftIcon}
              size="medium"
              color="white"
              disabled
            />
          </Box>
        )}
        <InputGS
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          testID="input-field"
          className={CNInput}>
          <InputField
            placeholder={placeholder}
            placeholderTextColor="#9A9A9A"
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </InputGS>
      </HStack>
      <Text
        className="text-right px-2 text-red-500 line-clamp-1"
        size="bodyXS"
        weight="medium">
        {isInvalid && invalidText ? invalidText : ""}
      </Text>
    </VStack>
  );
};

export default Input;
