import React from "react";
import { Pressable } from "./ui/pressable";
import clsx from "clsx";

type Props = {
  icon: React.ReactNode;
  isDisabled?: boolean;
  isDestructive?: boolean;
};

const ThemedIconButton = ({ icon, isDisabled, isDestructive }: Props) => {
  const CNButton = clsx(
    "w-[36px] h-[36px] justify-center items-center rounded-[10px]",
    {
      "bg-primary-100": !isDisabled && !isDestructive,
      "bg-[#C6C2C2]": isDisabled,
      "bg-error": isDestructive,
    }
  );
  return (
    <Pressable className={CNButton} disabled={isDisabled}>
      {React.cloneElement(icon as React.ReactElement, {
        //@ts-ignore
        size: 22,
        color: "white",
      })}
    </Pressable>
  );
};

export default ThemedIconButton;
