import { Box } from "../../gluestack-ui/box";
import { HStack } from "../../gluestack-ui/hstack";
import { Pressable } from "../../gluestack-ui/pressable";
import { VStack } from "../../gluestack-ui/vstack";
import Icon, { IconList } from "./Icon";
import Text from "../primitives/Text";

type Props = {
  icon: IconList;
  title: string;
  description?: string;
  unread?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const NotificationCard = ({
  icon,
  title,
  description,
  unread,
  disabled,
  onPress,
}: Props) => {
  return (
    <Pressable
      className="w-full h-[62px] justify-center py-2 px-4"
      style={{
        backgroundColor: unread ? "#F1F7FE" : "transparent",
      }}
      testID="pressable"
      disabled={disabled}
      onPress={onPress}
    >
      <HStack className="items-center gap-6 h-full">
        <Box
          testID="icon-box"
          className="h-[20px] w-[20px] items-center justify-center rounded-[5px]"
          style={{
            backgroundColor: unread ? "#7A9CC3" : "#006EE9",
          }}
        >
          <Icon icon={icon} color="white" size="small" />
        </Box>
        <VStack className="flex-1 h-full justify-center gap-[1px]">
          <Text size="bodyS" weight="semi-bold" className="line-clamp-1">
            {title}
          </Text>
          <Text size="caption" className="line-clamp-1">
            {description}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default NotificationCard;
