import {
  Avatar as AvatarGS,
  AvatarFallbackText,
  AvatarImage,
} from "../../gluestack-ui/avatar";
import { Box } from "../../gluestack-ui/box";
import { Pressable } from "../../gluestack-ui/pressable";
import Icon from "./Icon";

type Props = {
  avatarURL?: string;
  fallbackName?: string;
  editable?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const Avatar = ({
  avatarURL,
  fallbackName,
  editable,
  disabled,
  onPress,
}: Props) => {
  return (
    <Pressable
      testID="avatar-pressable"
      disabled={disabled}
      onPress={() => {
        if (onPress && !disabled) {
          onPress();
        }
      }}
    >
      <AvatarGS className="w-[90px] h-[90px]">
        <AvatarFallbackText
          testID="avatar-fallback"
          className="text-[30px] line-clamp-1"
        >
          {fallbackName}
        </AvatarFallbackText>
        {avatarURL && (
          <AvatarImage
            testID="avatar-image"
            source={{
              uri: avatarURL,
            }}
          />
        )}
        {editable && (
          <Box
            testID="avatar-edit-icon-wrapper"
            className="absolute -bottom-0 -right-1 bg-white rounded-full p-2 border-[1px] border-primary-50"
          >
            <Icon icon="edit-2" size="small" />
          </Box>
        )}
      </AvatarGS>
    </Pressable>
  );
};

export default Avatar;
