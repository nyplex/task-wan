import { VStack } from "@/gluestack-ui/vstack";
import { Box } from "@/gluestack-ui/box";

const DailyTasksLoader = () => {
  return (
    <VStack className="gap-4">
      <Box className="h-[46px] w-full rounded-[10px] bg-gray-200 animate-pulse" />
      <Box className="h-[46px] w-full rounded-[10px] bg-gray-200 animate-pulse" />
      <Box className="h-[46px] w-full rounded-[10px] bg-gray-200 animate-pulse" />
      <Box className="h-[46px] w-full rounded-[10px] bg-gray-200 animate-pulse" />
    </VStack>
  );
};
export default DailyTasksLoader;
