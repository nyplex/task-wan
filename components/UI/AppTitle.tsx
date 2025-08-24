import { Box } from "@/gluestack-ui/box";
import ThemedText from "./Text";

const AppTitle = () => {
  return (
    <Box testID="AppTitle">
      <ThemedText
        size="headingXL"
        weight="bold"
        className="text-primary-0 text-center"
      >
        TASK-WAN
      </ThemedText>
      <ThemedText
        size="body"
        weight="semi-bold"
        color="secondary"
        className="tracking-[4.3px] text-center"
      >
        Management App
      </ThemedText>
    </Box>
  );
};

export default AppTitle;
