import { Box } from "../gluestack/box";
import { HStack } from "../gluestack/hstack";
import Avatar from "./Avatar";
import Text from "../Text";
import Icon from "./Icon";

type Props = {
  avatarURL?: string;
  name: string;
  profession?: string;
  location?: string;
  tasksCompleted?: number;
};

const ProfileCard = ({ avatarURL, name, profession, location, tasksCompleted }: Props) => {
  return (
    <Box className="w-full h-[205px] justify-end rounded-[10px] shadow-soft-1">
      <Box className="bg-white w-full h-[180px] rounded-[10px]">
        <Box className="absolute top-[-25px] left-1/2 transform -translate-x-1/2">
          <Avatar
            fallbackName={name}
            avatarURL={avatarURL}
          />
        </Box>
        <Box className="flex-1 mt-[75px] px-4 pb-4">
          <Box className="flex-1">
            <Text
              size="bodyL"
              weight="bold"
              className="text-center text-primary-50">
              {name}
            </Text>
            <Text
              size="bodyXS"
              className="text-center mt-1">
              {profession}
            </Text>
          </Box>
          <HStack className="justify-between">
            {location && (
              <HStack className="gap-2 items-center flex-1">
                <Icon icon="map-pin" />
                <Text size="bodyXS">{location}</Text>
              </HStack>
            )}
            <HStack className="gap-2 items-center">
              <Icon icon="bar-chart-2" />
              <Text size="bodyXS">{tasksCompleted} Task completed</Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
