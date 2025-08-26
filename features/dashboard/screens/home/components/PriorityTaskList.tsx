import { FlashList } from "@shopify/flash-list";
import { getTimeLeft } from "@/features/dashboard/utils/getTimeLeft";
import { getTaskProgress } from "@/features/dashboard/utils/getTaskProgress";
import useGetPriorityTasks from "@/features/dashboard/hooks/useGetPriorityTasks";
import PriorityTaskCard from "@/components/UI/PriorityTaskCard";
import { Box } from "@/gluestack-ui/box";
import Text from "@/components/UI/Text";

const bg = [
  "Sky Blue",
  "Green",
  "Yellow",
  "Rose Pink",
  "Purple",
  "Grey",
  "Orange",
  "Lime Green",
  "Cyan",
  "Violet",
];

const PriorityTaskList = () => {
  const data = useGetPriorityTasks();

  return (
    <Box className="mt-8">
      <Text className="px-4" size="bodyL" weight="bold">
        My Priority Task
      </Text>
      <Box className="h-[188px] mt-4">
        <FlashList
          data={data || []}
          estimatedItemSize={188}
          renderItem={({ item }) => (
            <Box style={{ height: 188 }}>
              <PriorityTaskCard
                title={item.title || "No Title"}
                timeLeft={getTimeLeft(item.end_date)}
                progress={getTaskProgress(item)}
                bgColor={bg[Math.floor(Math.random() * bg.length)] as any}
              />
            </Box>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box className="w-4" />}
          contentContainerClassName="px-4 w-full"
          ListEmptyComponent={
            <Box className="h-[188px] w-full">
              <Text className="text-center" size="bodyL">
                No priority tasks available
              </Text>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default PriorityTaskList;
