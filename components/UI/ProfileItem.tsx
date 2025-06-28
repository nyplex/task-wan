import { Box } from "../gluestack/box";
import { HStack } from "../gluestack/hstack";
import { Pressable } from "../gluestack/pressable";
import Text from "../Text";
import Icon from "./Icon";

type Props = {
  icon:
    | "user"
    | "bar-chart-2"
    | "map-pin"
    | "settings"
    | "log-out"
    | "bell"
    | "lock"
    | "life-buoy"
    | "info"
    | "users";
  title: string;
  badgeCounter?: number;
  disabled?: boolean;
  onPress?: () => void;
};

const ProfileItem = ({ icon, title, badgeCounter = 0, disabled, onPress }: Props) => {
  return (
    <Pressable
      role="button"
      className="py-2 px-4 active:bg-primary-700 h-[54px] items-center justify-center"
      disabled={disabled}
      onPress={onPress}>
      <HStack className="items-center">
        <HStack className="items-center gap-8 flex-1">
          <Icon
            icon={icon}
            size="large"
          />
          <Text
            size="body"
            weight="medium">
            {title}
          </Text>
        </HStack>
        {badgeCounter > 0 && (
          <Box className="bg-primary-50 h-[25px] w-[25px] rounded-full items-center justify-center">
            <Text
              className="text-center text-white"
              size="bodyXS"
              weight="semi-bold">
              {badgeCounter > 99 ? "99+" : badgeCounter}
            </Text>
          </Box>
        )}
      </HStack>
    </Pressable>
  );
};

export default ProfileItem;
