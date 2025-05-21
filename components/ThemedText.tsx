import { Text as TextGS } from "@/components/ui/text";
import clsx from "clsx";

type TextProps = {
  children: React.ReactNode;
  size?:
    | "heading2XL"
    | "headingXL"
    | "heading"
    | "bodyL"
    | "body"
    | "bodyS"
    | "bodyXS"
    | "caption";
  weight?: "bold" | "semi-bold" | "medium" | "regular";
  color?: "primary" | "secondary" | "disabled";
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
};

const ThemedText = ({
  children,
  size = "body",
  weight = "regular",
  color = "primary",
  disabled,
  className,
  onPress,
}: TextProps) => {
  const CN = clsx("based-styles", {
    // Set font family based on weight
    "font-bold": weight === "bold",
    "font-semibold": weight === "semi-bold",
    "font-medium": weight === "medium",
    "font-regular": weight === "regular",

    // Set color
    "text-typography-primary": color === "primary",
    "text-typography-secondary": color === "secondary",
    "text-typography-disabled": color === "disabled",

    // Set font size
    "text-[40px]": size === "heading2XL",
    "text-[32px]": size === "headingXL",
    "text-[24px]": size === "heading",
    "text-[20px]": size === "bodyL",
    "text-[16px]": size === "body",
    "text-[14px]": size === "bodyS",
    "text-[12px]": size === "bodyXS",
    "text-[10px]": size === "caption",

    // Set line height
    // "leading-[34px]": size === "heading2XL" || size === "heading2XL-light",
    // "leading-[30px]": size === "headingXL" || size === "headingXL-light",
    // "leading-[20px]": size === "heading" || size === "heading-light",
    // "leading-[18px]": size === "bodyL" || size === "bodyL-bold",
    // "leading-[16px]": size === "body" || size === "body-bold",
    // "leading-[14px]": size === "bodyS" || size === "bodyS-bold",
    // "leading-[12px]": size === "bodyXS" || size === "bodyXS-bold",

    // Set letter spacing
    "tracking-[1px]":
      size === "heading2XL" || size === "headingXL" || size === "heading",
    "tracking-[0.5px]": size === "bodyL",
    "tracking-[0px]": size === "body" || size === "bodyS" || size === "bodyXS",
  });

  return (
    <TextGS
      onPress={onPress}
      className={clsx(CN, className)}
      disabled={disabled}
    >
      {children}
    </TextGS>
  );
};

export default ThemedText;
