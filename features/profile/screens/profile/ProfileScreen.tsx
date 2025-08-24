import { Box } from "@/gluestack-ui/box";
import { VStack } from "@/gluestack-ui/vstack";
import ProfileHeader from "./components/ProfileHeader";
import ProfileItem from "@/components/UI/ProfileItem";
import EditProfile from "./components/MyProfileButton";
import Logout from "./components/LogoutButton";
import Settings from "./components/SettingsButton";

const ProfileScreen = () => {
  return (
    <Box className="flex-1 bg-white">
      <ProfileHeader />
      <VStack className="mt-[95px] flex-1 mb-safe-offset-4 gap-6">
        <EditProfile />
        <ProfileItem icon="bar-chart-2" title="Statistics" />
        <ProfileItem icon="map-pin" title="Location" />
        <Settings />
        <Logout />
      </VStack>
    </Box>
  );
};

export default ProfileScreen;
