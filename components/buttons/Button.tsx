import { useState } from "react";
import { ButtonSpinner, Button as GSButton } from "@/components/gluestack/button";
import { HStack } from "../gluestack/hstack";
import ThemedText from "../Text";
import clsx from "clsx";

type Props = {
  title: string;
  variant?: "primary" | "secondary";
  size?: "small" | "large";
  disabled?: boolean;
  isLoading?: boolean;
  destructive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  onTouchEnd?: () => void;
};

const Button = ({
  title,
  variant = "primary",
  size = "large",
  disabled,
  isLoading,
  destructive,
  leftIcon,
  rightIcon,
  onPress,
  onTouchEnd,
}: Props) => {
  const [active, setActive] = useState(0);
  const CNBtn = clsx("based-styles", {
    "w-full": true,
    "h-[48px]": size === "large",
    "h-[36px]": size === "small",
    "rounded-[10px]": true,
    "bg-primary-0 data-[active=true]:bg-primary-50": variant === "primary",
    "bg-[#C6C2C2]": variant === "primary" && disabled,
    "bg-error": variant === "primary" && destructive && !disabled,
    "bg-transparent data-[active=true]:bg-transparent": variant === "secondary",
    "border border-primary-50 border-[1px] data-[active=true]:border-primary-0":
      variant === "secondary",
    "border border-[#C6C2C2]": (variant === "secondary" && disabled) || isLoading,
    "border border-error data-[active=true]:border-error":
      variant === "secondary" && destructive && !disabled,
  });

  const CNText = clsx("text-buttons-text", {
    "text-white": variant === "primary",
    "text-primary-50": variant === "secondary",
    "text-primary-0": active === 1 && variant === "secondary",
    "text-typography-secondary": disabled || isLoading,
    "text-error": variant === "secondary" && destructive && !disabled,
  });

  return (
    <>
      <GSButton
        testID="Button"
        className={CNBtn}
        disabled={disabled || isLoading}
        onPress={onPress}
        onTouchEnd={onTouchEnd}
        onPressIn={() => {
          setActive(1);
        }}
        onPressOut={() => {
          setActive(0);
        }}>
        {!isLoading && (
          <HStack className="items-center justify-center gap-2 flex-1">
            {leftIcon && leftIcon}
            <ThemedText
              size="body"
              weight="regular"
              className={CNText}>
              {title}
            </ThemedText>
            {rightIcon && rightIcon}
          </HStack>
        )}
        {isLoading && <ButtonSpinner />}
      </GSButton>
    </>
  );
};

export default Button;
