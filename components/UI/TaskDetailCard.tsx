import { Box } from "../gluestack/box";
import { HStack } from "../gluestack/hstack";
import { Pressable } from "../gluestack/pressable";
import { VStack } from "../gluestack/vstack";
import Text from "../Text";
import Icon from "./Icon";

type Props = {
  taskId?: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  onPressMore?: (id: string) => void;
  onPress?: (id: string) => void;
  disabled?: boolean;
};

const TaskDetailCard = ({
  taskId,
  title,
  description,
  startDate,
  endDate,
  disabled,
  onPressMore,
  onPress,
}: Props) => {
  return (
    <Pressable
      role="button"
      className="w-full h-[164px] border-[1px] border-primary-700 rounded-[10px]"
      disabled={disabled}
      onPress={() => {
        if (onPress && taskId) {
          onPress(taskId);
        }
      }}>
      <Box className="absolute h-1/2 w-[3px] bg-primary-50 -left-[2px] top-1/2 translate-y-[-50%] rounded-full" />
      <VStack className="px-4 pt-4 pb-2 justify-between flex-1">
        <HStack className="items-center justify-between">
          <Text
            className="text-primary-50 flex-1 line-clamp-1"
            size="body"
            weight="semi-bold">
            {title}
          </Text>
          <Icon
            icon="more-horizontal"
            size="large"
            onPress={() => {
              if (onPressMore && taskId) {
                onPressMore(taskId);
              }
            }}
          />
        </HStack>
        <Text
          size="bodyXS"
          className="mt-2 line-clamp-6">
          {description}
        </Text>
        <Text
          className="text-primary-50 mt-2 text-right"
          size="caption"
          weight="medium">
          {new Date(startDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}{" "}
          -{" "}
          {new Date(endDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default TaskDetailCard;
