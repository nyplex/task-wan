import useAuth from "@/hooks/useAuth";
import ProfileScreen from "@/screens/profile/ProfileScreen";

export default function Profile() {
  const { logout } = useAuth();
  return <ProfileScreen />;
}
