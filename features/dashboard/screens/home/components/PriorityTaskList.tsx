import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { getTimeLeft } from "@/features/dashboard/utils/getTimeLeft";
import { getTaskProgress } from "@/features/dashboard/utils/getTaskProgress";
import useGetPriorityTasks from "@/features/dashboard/hooks/useGetPriorityTasks";
import PriorityTaskCard from "@/components/UI/PriorityTaskCard";
import { Box } from "@/gluestack-ui/box";
import Text from "@/components/UI/Text";
import PriorityTasksLoader from "./PriorityTasksLoader";
import EmptyPriorityTask from "./EmptyPriorityTask";

const getBgColor = (id: string | number) => {
  const index =
    Math.abs(
      [...id.toString()].reduce((acc, char) => acc + char.charCodeAt(0), 0),
    ) % 10;
  return index + 1;
};

const PriorityTaskList = () => {
  const navigation = useRouter();
  const { tasks, isLoading } = useGetPriorityTasks();

  return (
    <Box className="mt-8">
      <Text className="px-4" size="bodyL" weight="bold">
        My Priority Task
      </Text>
      <Box className="h-[200px] mt-4">
        <FlashList
          data={tasks || []}
          estimatedItemSize={200}
          renderItem={({ item }) => (
            <Box style={{ height: 200 }}>
              <PriorityTaskCard
                title={item.title || "No Title"}
                timeLeft={getTimeLeft(item.end_date)}
                progress={getTaskProgress(item)}
                bgColor={getBgColor(item.id)}
                onPress={() => {
                  navigation.navigate({
                    pathname: "/(root)/(priorityTask)/[taskID]",
                    params: { taskID: item.id },
                  });
                }}
              />
            </Box>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box className="w-4" />}
          contentContainerClassName="px-4"
          ListEmptyComponent={
            isLoading ? <PriorityTasksLoader /> : <EmptyPriorityTask />
          }
        />
      </Box>
    </Box>
  );
};

export default PriorityTaskList;
