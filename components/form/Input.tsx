import { KeyboardType } from "react-native";
import { Input as InputGS, InputField } from "@/gluestack-ui/input";
import { HStack } from "@/gluestack-ui/hstack";
import { VStack } from "@/gluestack-ui/vstack";
import { Pressable } from "../../gluestack-ui/pressable";
import { Box } from "@/gluestack-ui/box";
import { clsx } from "clsx";
import Icon, { IconList } from "../UI/Icon";
import Text from "../primitives/Text";

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
  onPress?: () => void;
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
  onPress,
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
    <Pressable onPress={onPress} disabled={isDisabled} testID="input-pressable">
      <VStack>
        <HStack>
          {leftIcon && (
            <Box className={CNIconBox}>
              <Icon icon={leftIcon} size="medium" color="white" disabled />
            </Box>
          )}
          <InputGS
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            testID="input-field"
            className={CNInput}
          >
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
          weight="medium"
          testID="input-invalid-text"
        >
          {isInvalid && invalidText ? invalidText : ""}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default Input;
