import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import HeaderLayout from "@/components/layout/HeaderLayout";
import EditProfileForm from "./components/EditProfileForm";

const EditProfileScreen = () => {
  const navigation = useRouter();

  const Header = () => (
    <HeaderLayout
      onPressIcon={() => navigation.back()}
      title="My Profile"
      icon="arrow-left"
    />
  );
  return (
    <ScreenWrapper header={<Header />}>
      <EditProfileForm />
    </ScreenWrapper>
  );
};
export default EditProfileScreen;
