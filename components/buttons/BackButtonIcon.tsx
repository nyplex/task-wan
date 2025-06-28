import Feather from "@expo/vector-icons/Feather";
import { Pressable } from "../gluestack/pressable";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
};

const BackButtonIcon = ({ onPress, disabled }: Props) => {
  return (
    <Pressable
      testID="BackButtonIcon"
      className="w-[36px] h-[36px] items-center justify-center bg-primary-0 rounded-[10px]"
      onPress={onPress}
      disabled={disabled}>
      <Feather
        name="arrow-left"
        size={24}
        color="white"
      />
    </Pressable>
  );
};

export default BackButtonIcon;
