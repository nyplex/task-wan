import { Box } from "@/gluestack-ui/box";
import Text from "@/components/UI/Text";

const EmptyPriorityTask = () => {
  return (
    <Box className="h-[200px] w-full">
      <Text className="text-center" size="bodyL">
        No priority tasks available
      </Text>
    </Box>
  );
};
export default EmptyPriorityTask;
