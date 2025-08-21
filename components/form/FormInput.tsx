import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { IconList } from "@/components/UI/Icon";
import Input from "./Input";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  icon: IconList;
  rules?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  onFocus?: () => void;
  onPress?: () => void;
};

const FormInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  icon,
  rules,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = true,
  secureTextEntry = false,
  isDisabled = false,
  maxLength,
  onFocus,
  onPress,
}: FormInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <Input
        keyboardType={keyboardType}
        leftIcon={icon}
        value={value}
        autoCorrect={autoCorrect}
        onChangeText={(text) => onChange(text)}
        onBlur={onBlur}
        isInvalid={!!error}
        placeholder={placeholder}
        invalidText={error?.message || " "}
        autoCapitalize={autoCapitalize}
        isDisabled={isDisabled}
        maxLength={maxLength}
        onFocus={onFocus}
        onPress={onPress}
        secureTextEntry={secureTextEntry}
      />
    )}
  />
);

export default FormInput;
