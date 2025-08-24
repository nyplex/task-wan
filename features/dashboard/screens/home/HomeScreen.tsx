import { ScrollView } from "react-native";
import { HStack } from "@/gluestack-ui/hstack";
import { Box } from "@/gluestack-ui/box";
import Text from "@/components/UI/Text";
import Icon from "@/components/UI/Icon";
import WelcomeMessage from "./components/WelcomeMessage";
import PriorityTaskList from "./components/PriorityTaskList";
import DailyTaskList from "./components/DailyTaskList";

export default function HomeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}
    >
      <Box className="flex-1 bg-background py-safe-offset-4">
        <Box className="px-4">
          <HStack className="justify-between items-center">
            <Text size="bodyS">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <Icon icon="bell" />
          </HStack>
          <WelcomeMessage />
        </Box>
        <PriorityTaskList />
        <DailyTaskList />
      </Box>
    </ScrollView>
  );
}
