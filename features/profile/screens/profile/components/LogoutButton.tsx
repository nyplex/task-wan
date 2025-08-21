import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/features/authentication/authSlice/authSelectors";
import useAuth from "@/features/authentication/hooks/useAuth";
import ProfileItem from "@/components/UI/ProfileItem";

const LogoutButton = () => {
  const { logout } = useAuth();
  const authIsLoading = useSelector(selectAuthStatus);

  return (
    <ProfileItem
      icon="log-out"
      title="Logout"
      onPress={logout}
      disabled={authIsLoading}
    />
  );
};
export default LogoutButton;
