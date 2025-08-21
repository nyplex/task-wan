import { useRouter } from "expo-router";
import { VStack } from "@/gluestack-ui/vstack";
import HeaderLayout from "@/components/layout/HeaderLayout";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ProfileItem from "@/components/UI/ProfileItem";

const SettingsScreen = () => {
  const navigation = useRouter();

  return (
    <ScreenWrapper
      header={
        <HeaderLayout
          icon="arrow-left"
          onPressIcon={() => navigation.back()}
          title="Settings"
        />
      }
    >
      <VStack className="mt-[50px] flex-1 mb-safe-offset-4 gap-6">
        <ProfileItem icon="bell" title="Notifications" />
        <ProfileItem icon="lock" title="Security" />
        <ProfileItem icon="life-buoy" title="Help" />
        <ProfileItem icon="info" title="About" />
        <ProfileItem icon="users" title="Share with a friend" />
      </VStack>
    </ScreenWrapper>
  );
};
export default SettingsScreen;
