import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@/gluestack-ui/box";
import TaskCard from "@/components/UI/TaskCard";
import Text from "@/components/UI/Text";
import useGetDailyTasks from "@/features/dashboard/hooks/useGetDailyTasks";
import DailyTasksLoader from "./DailyTasksLoader";
import EmptyDailyTask from "./EmptyDailyTask";

const DailyTaskList = () => {
  const navigation = useRouter();
  const { tasks, isLoading } = useGetDailyTasks();

  return (
    <Box className="mt-8">
      <Text className="px-4" size="bodyL" weight="bold">
        Daily Tasks
      </Text>
      <Box className="mt-4 flex-1 px-4">
        <FlashList
          data={tasks}
          estimatedItemSize={46}
          renderItem={({ item }) => (
            <TaskCard
              title={item.title}
              isSelected={false}
              showSelect
              onPress={() => {
                navigation.navigate({
                  pathname: "/(root)/(dailyTask)/[taskID]",
                  params: { taskID: item.id },
                });
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box className="h-4" />}
          contentContainerClassName="pb-safe-offset-4"
          ListEmptyComponent={
            isLoading ? <DailyTasksLoader /> : <EmptyDailyTask />
          }
        />
      </Box>
    </Box>
  );
};

export default DailyTaskList;
