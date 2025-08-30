import { HStack } from "@/gluestack-ui/hstack";
import { Box } from "@/gluestack-ui/box";

const PriorityTasksLoader = () => {
  return (
    <HStack className="gap-4">
      <Box className="h-[200px] w-[150px] rounded-[20px] bg-gray-200 animate-pulse" />
      <Box className="h-[200px] w-[150px] rounded-[20px] bg-gray-200 animate-pulse" />
      <Box className="h-[200px] w-[150px] rounded-[20px] bg-gray-200 animate-pulse" />
    </HStack>
  );
};
export default PriorityTasksLoader;
