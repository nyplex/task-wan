import Text from "@/components/Text";
import PriorityTaskCard from "@/components/UI/PriorityTaskCard";
import { Box } from "@/components/gluestack/box";
import { FlashList } from "@shopify/flash-list";

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
  return (
    <Box className="mt-8">
      <Text
        className="px-4"
        size="bodyL"
        weight="bold">
        My Priority Task
      </Text>
      <Box className="h-[188px] mt-4">
        <FlashList
          data={Array.from({ length: 10 }, (_, i) => ({
            id: i,
            title: `Task ${i + 1}`,
            timeLeft: `${i + 1} days left`,
            progress: Math.min(100, (i + 1) * 10), // Example progress, can be dynamic
            bgColor: bg[i % bg.length], // Cycle through colors
          }))}
          estimatedItemSize={188}
          renderItem={({ item }) => (
            <PriorityTaskCard
              title={item.title}
              timeLeft={item.timeLeft}
              progress={item.progress}
              bgColor={item.bgColor as any}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box className="w-4" />}
          contentContainerClassName="px-4"
        />
      </Box>
    </Box>
  );
};

export default PriorityTaskList;
