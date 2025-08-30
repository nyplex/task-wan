import { Box } from "@/gluestack-ui/box";
import Text from "@/components/UI/Text";

const EmptyDailyTask = () => {
  return (
    <Box className="h-[188px] w-full">
      <Text className="text-center" size="bodyL">
        No daily tasks available
      </Text>
    </Box>
  );
};
export default EmptyDailyTask;
