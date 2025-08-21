import { useRouter } from "expo-router";
import ProfileItem from "@/components/UI/ProfileItem";

const MyProfileButton = () => {
  const navigation = useRouter();

  const onPressEdit = () => {
    navigation.navigate("/(root)/editProfile");
  };
  return <ProfileItem icon="user" title="My Profile" onPress={onPressEdit} />;
};
export default MyProfileButton;
