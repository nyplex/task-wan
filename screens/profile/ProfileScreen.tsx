import Text from "@/components/Text";
import ProfileCard from "@/components/UI/ProfileCard";
import ProfileItem from "@/components/UI/ProfileItem";
import { Box } from "@/components/gluestack/box";
import { VStack } from "@/components/gluestack/vstack";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import {
  selectAuthStatus,
  selectSession,
} from "@/redux/slices/authSlice/authSelectors";
import { useGetProfileQuery } from "@/redux/slices/apiSlice/endpoints/profile/getProfile";
import { useUpdateProfileMutation } from "@/redux/slices/apiSlice/endpoints/profile/updateProfile";

const ProfileScreen = () => {
  const { logout } = useAuth();
  const authIsLoading = useSelector(selectAuthStatus);
  const session = useSelector(selectSession);
  const [updateProfile] = useUpdateProfileMutation();
  const { data } = useGetProfileQuery({ userID: session?.user.id! });
  console.log("ProfileScreen data:", data);

  const onPressEdit = async () => {
    try {
      const { data, error } = await updateProfile({
        id: session?.user.id!,
        name: "Alexandre",
        email: "test@gmail.com",
        location: "London, UK",
        profession: "Software Engineer",
        avatar: "https://example.com/avatar.jpg",
        dob: "07-07-1990",
      });
      console.log("Profile updated:", data);
      if (error) {
        console.error("Error updating profile:", error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <Box className="h-[250px] bg-primary-50 rounded-b-[20%] px-4 pt-safe-offset-4">
        <Text className="text-white" size="bodyL" weight="semi-bold">
          Profile
        </Text>
      </Box>
      <Box className="flex-1 bg-white px-4 ">
        <Box className="h-[80px]">
          <Box className="absolute top-[-125px] left-0 right-0 justify-center items-center">
            <ProfileCard
              name={data?.name || "Unknown"}
              location={data?.location || "Unknown"}
              profession={data?.profession || "Unknown"}
            />
          </Box>
        </Box>
        <VStack className="mt-4">
          <ProfileItem icon="user" title="My Profile" onPress={onPressEdit} />
          <ProfileItem icon="bar-chart-2" title="Statistics" />
          <ProfileItem icon="map-pin" title="Location" />
          <ProfileItem icon="settings" title="Settings" />
          <ProfileItem
            icon="log-out"
            title="Logout"
            onPress={logout}
            disabled={authIsLoading}
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
