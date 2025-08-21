import { HStack } from "@/gluestack-ui/hstack";
import { IconList } from "@/components/UI/Icon";
import IconButton from "@/components/buttons/IconButton";
import Text from "@/components/UI/Text";

type Props = {
  onPressIcon: () => void;
  title: string;
  icon: IconList;
};

const HeaderLayout = ({ onPressIcon, title, icon }: Props) => {
  return (
    <HStack className="items-center px-4">
      <IconButton
        icon={icon}
        onPress={onPressIcon}
        size="medium"
        color="white"
      />
      <Text size="body" weight="bold" className="ml-4 text-white">
        {title}
      </Text>
    </HStack>
  );
};
export default HeaderLayout;
