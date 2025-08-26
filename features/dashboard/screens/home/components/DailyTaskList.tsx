import { FlashList } from "@shopify/flash-list";
import { Box } from "@/gluestack-ui/box";
import TaskCard from "@/components/UI/TaskCard";
import Text from "@/components/UI/Text";
import useGetDailyTasks from "@/features/dashboard/hooks/useGetDailyTasks";

const DailyTaskList = () => {
  const subtasks = useGetDailyTasks();

  return (
    <Box className="mt-8">
      <Text className="px-4" size="bodyL" weight="bold">
        Daily Tasks
      </Text>
      <Box className="mt-4 flex-1 px-4">
        <FlashList
          data={subtasks}
          estimatedItemSize={188}
          renderItem={({ item }) => (
            <TaskCard title={item.title} isSelected={false} showSelect />
          )}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box className="h-4" />}
          contentContainerClassName="pb-safe-offset-4"
        />
      </Box>
    </Box>
  );
};

export default DailyTaskList;
