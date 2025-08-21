import Text from "@/components/UI/Text";
import Icon from "@/components/UI/Icon";
import { HStack } from "@/gluestack-ui/hstack";

const Header = () => {
  return (
    <HStack className="justify-between items-center">
      <Text size="bodyS">Saturday, Feb 20 2022</Text>
      <Icon icon="bell" />
    </HStack>
  );
};

export default Header;
