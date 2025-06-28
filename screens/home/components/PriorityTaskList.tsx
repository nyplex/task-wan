import PriorityTaskCard from "@/components/UI/PriorityTaskCard";
import { Box } from "@/components/gluestack/box";
import { FlashList } from "@shopify/flash-list";

const PriorityTaskList = () => {
  return (
    <Box className="h-[188px]">
      <FlashList
        data={Array.from({ length: 10 }, (_, i) => ({
          id: i,
          title: `Task ${i + 1}`,
          timeLeft: `${i + 1} days left`,
          progress: Math.min(100, (i + 1) * 10), // Example progress, can be dynamic
        }))}
        estimatedItemSize={188}
        renderItem={({ item }) => (
          <PriorityTaskCard
            title={item.title}
            timeLeft={item.timeLeft}
            progress={item.progress}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Box className="w-2" />}
      />
    </Box>
  );
};

export default PriorityTaskList;
