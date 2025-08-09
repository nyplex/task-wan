import Text from "@/components/Text";
import TaskCard from "@/components/UI/TaskCard";
import { Box } from "@/components/gluestack/box";
import { FlashList } from "@shopify/flash-list";

const DailyTaskList = () => {
  return (
    <Box className="mt-8">
      <Text className="px-4" size="bodyL" weight="bold">
        Daily Tasks
      </Text>
      <Box className="mt-4 flex-1 px-4">
        <FlashList
          data={Array.from({ length: 10 }, (_, i) => ({
            id: i,
            title: `Task ${i + 1}`,
          }))}
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
