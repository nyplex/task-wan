import { useEffect, useState } from "react";
import { Pressable } from "../gluestack/pressable";
import Icon from "../UI/Icon";

type Props = {
  checked?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const Checkbox = ({ checked, disabled, onPress }: Props) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const toggleCheckbox = () => {
    if (!disabled && onPress) {
      setIsChecked((prev) => !prev);
      onPress();
    }
  };

  return (
    <Pressable
      role="button"
      disabled={disabled}
      onPress={toggleCheckbox}
      style={{
        backgroundColor: isChecked ? "#006EE9" : undefined,
      }}
      className="w-[30px] h-[30px] items-center justify-center border-2 border-primary-50 rounded-[10px]"
    >
      {isChecked && <Icon icon="check" size="large" color="white" />}
    </Pressable>
  );
};

export default Checkbox;
