import { Pressable } from "../gluestack/pressable";
import { HStack } from "../gluestack/hstack";
import { Box } from "../gluestack/box";
import Text from "../Text";

type Props = {
  title: string;
  showSelect?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const TaskCard = ({
  title,
  showSelect,
  isSelected,
  disabled,
  onPress,
}: Props) => {
  return (
    <Pressable
      role="button"
      disabled={disabled}
      onPress={onPress}
      className="h-[46px] w-full bg-white rounded-[10px] border-[1px] border-primary-700 py-2 px-3 items-center"
    >
      <HStack className="items-center justify-between flex-1 w-full gap-2">
        <Text
          className={
            isSelected
              ? "line-clamp-1 flex-1 text-primary-0"
              : "line-clamp-1 flex-1"
          }
          size="body"
          weight="regular"
        >
          {title}
        </Text>
        {showSelect && (
          <Box
            testID="select-circle"
            className="h-6 w-6 rounded-full border-2 border-primary-0 items-center justify-center p-[1px]"
          >
            {isSelected && (
              <Box
                testID="filled-circle"
                className="h-full w-full bg-primary-50 rounded-full"
              />
            )}
          </Box>
        )}
      </HStack>
    </Pressable>
  );
};

export default TaskCard;
