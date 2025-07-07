import Text from "@/components/Text";
import Icon from "@/components/UI/Icon";
import { HStack } from "@/components/gluestack/hstack";

const Header = () => {
  return (
    <HStack className="justify-between items-center">
      <Text size="bodyS">Saturday, Feb 20 2022</Text>
      <Icon icon="bell" />
    </HStack>
  );
};

export default Header;
