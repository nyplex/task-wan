import { useRouter } from "expo-router";
import { Box } from "@/gluestack-ui/box";
import HeaderLayout from "@/components/layout/HeaderLayout";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import Text from "@/components/UI/Text";

const SettingsScreen = () => {
  const navigaation = useRouter();

  return (
    <ScreenWrapper
      header={
        <HeaderLayout
          icon="arrow-left"
          onPressIcon={() => navigaation.back()}
          title="Settings"
        />
      }
    >
      <Box className="flex-1">
        <Text className="text-center text-lg font-semibold">
          Settings Screen
        </Text>
      </Box>
    </ScreenWrapper>
  );
};
export default SettingsScreen;
