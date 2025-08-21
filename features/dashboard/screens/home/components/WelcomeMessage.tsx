import { VStack } from "@/gluestack-ui/vstack";
import Text from "@/components/UI/Text";
import getCustomGreeting from "@/features/dashboard/utils/getCustomGreeting";

const WelcomeMessage = () => {
  return (
    <VStack className="mt-8 gap-1">
      <Text size="heading" weight="bold">
        Welcome Jon Smith
      </Text>
      <Text size="bodyS" weight="medium">
        {getCustomGreeting()}
      </Text>
    </VStack>
  );
};

export default WelcomeMessage;
