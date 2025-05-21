import { KeyboardType } from "react-native";
import { Input, InputField } from "./ui/input";
import { Box } from "./ui/box";
import clsx from "clsx";

type Props = {
  isInvalid?: boolean;
  isDisabled?: boolean;
  value?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  maxLength?: number;
  keyboardType?: KeyboardType;
  onChangeText?: (text: string) => void;
};

const ThemedInput = ({
  isInvalid,
  isDisabled,
  value,
  placeholder,
  leftIcon,
  maxLength,
  keyboardType,
  onChangeText,
}: Props) => {
  const CNInput = clsx("text-buttons-text", {
    "h-[48px] rounded-[10px] border-[2px]": true,
    "border-primary-700 data-[focus=true]:border-primary-0": !isInvalid,
    "border-[#C6C2C2]": isDisabled,
    "border-error data-[focus=true]:border-error": isInvalid && !isDisabled,
  });

  const CNIconBox = clsx("h-full w-[50px] justify-center items-center", {
    "bg-primary-200": !isInvalid,
    "bg-[#C6C2C2]": isDisabled,
    "bg-error": isInvalid && !isDisabled,
  });

  return (
    <Input isInvalid={isInvalid} isDisabled={isDisabled} className={CNInput}>
      {leftIcon && <Box className={CNIconBox}>{leftIcon}</Box>}
      <InputField
        placeholder={placeholder}
        placeholderTextColor="#9A9A9A"
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </Input>
  );
};

export default ThemedInput;
