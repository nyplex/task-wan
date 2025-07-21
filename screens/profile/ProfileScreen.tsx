import Text from "@/components/Text";
import ProfileCard from "@/components/UI/ProfileCard";
import ProfileItem from "@/components/UI/ProfileItem";
import { Box } from "@/components/gluestack/box";
import { VStack } from "@/components/gluestack/vstack";
import useAuth from "@/hooks/useAuth";
import { useGetProfileQuery } from "@/redux/slices/apiSlice/apiSlice";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";

const ProfileScreen = () => {
  const { logout, user } = useAuth();
  const authIsLoading = useSelector(selectAuthStatus);

  const { isFetching, isError, isLoading, data } = useGetProfileQuery({ userID: user?.id! });
  // console.log("ProfileScreen data:", data);

  return (
    <Box className="flex-1 bg-white">
      <Box className="h-[250px] bg-primary-50 rounded-b-[20%] px-4 pt-safe-offset-4">
        <Text
          className="text-white"
          size="bodyL"
          weight="semi-bold">
          Profile
        </Text>
      </Box>
      <Box className="flex-1 bg-white px-4 ">
        <Box className="h-[80px]">
          <Box className="absolute top-[-125px] left-0 right-0 justify-center items-center">
            <ProfileCard
              name={data?.username!}
              location="London"
              profession="Software"
            />
          </Box>
        </Box>
        <VStack className="mt-4">
          <ProfileItem
            icon="user"
            title="My Profile"
          />
          <ProfileItem
            icon="bar-chart-2"
            title="Statistics"
          />
          <ProfileItem
            icon="map-pin"
            title="Location"
          />
          <ProfileItem
            icon="settings"
            title="Settings"
          />
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
