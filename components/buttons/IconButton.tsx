import React from "react";
import { Pressable } from "../gluestack/pressable";
import Icon, { IconList } from "../UI/Icon";
import clsx from "clsx";

type Props = {
  icon: IconList;
  isDisabled?: boolean;
  isDestructive?: boolean;
  color?: "primary" | "white";
  size: "small" | "medium" | "large";
  onPress?: () => void;
};

const IconButton = ({
  icon,
  isDisabled,
  isDestructive,
  color = "primary",
  size = "medium",
  onPress,
}: Props) => {
  const CNButton = clsx("justify-center items-center rounded-[10px]", {
    "bg-primary-100": !isDisabled && !isDestructive && color === "primary",
    "bg-[#C6C2C2]": isDisabled,
    "bg-error": isDestructive,
    "bg-white": !isDestructive && !isDisabled && color === "white",
    "w-[30px] h-[30px]": size === "small",
    "w-[36px] h-[36px]": size === "medium",
    "w-[40px] h-[40px]": size === "large",
  });
  return (
    <Pressable
      testID="icon-button"
      role="button"
      className={CNButton}
      disabled={isDisabled}
      onPress={onPress}>
      <Icon
        icon={icon}
        size={size}
        color={
          isDisabled ? "white" : isDestructive ? "white" : color === "primary" ? "white" : "primary"
        }
      />
    </Pressable>
  );
};

export default IconButton;
