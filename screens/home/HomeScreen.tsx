import { Box } from "@/components/gluestack/box";
import Header from "./components/Header";
import WelcomeMessage from "./components/WelcomeMessage";
import PriorityTaskList from "./components/PriorityTaskList";
import DailyTaskList from "./components/DailyTaskList";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}>
      <Box className="flex-1 bg-backrgound py-safe-offset-4">
        <Box className="px-4">
          <Header />
          <WelcomeMessage />
        </Box>
        <PriorityTaskList />
        <DailyTaskList />
      </Box>
    </ScrollView>
  );
}
