import { useRouter } from "expo-router";
import ProfileItem from "@/components/UI/ProfileItem";

const SettingsButton = () => {
  const navigation = useRouter();

  const onPressEdit = () => {
    navigation.navigate("/(root)/settings");
  };
  return <ProfileItem icon="settings" title="Settings" onPress={onPressEdit} />;
};
export default SettingsButton;
