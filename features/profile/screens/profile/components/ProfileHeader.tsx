import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@/redux/slices/apiSlice/endpoints/profile/getProfile";
import { selectSession } from "@/redux/slices/authSlice/authSelectors";
import { Box } from "@/gluestack-ui/box";
import ProfileCard from "@/components/UI/ProfileCard";

const ProfileHeader = () => {
  const session = useSelector(selectSession);
  const { data } = useGetProfileQuery({ userID: session?.user.id! });
  return (
    <Box className="top-safe-offset-4 px-4">
      <ProfileCard
        name={data?.name || "Unknown"}
        location={data?.location || "Unknown"}
        profession={data?.profession || "Unknown"}
        tasksCompleted={300}
      />
    </Box>
  );
};
export default ProfileHeader;
