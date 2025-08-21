import Header from "./components/Header";
import EditProfileForm from "./components/EditProfileForm";
import ScreenWrapper from "@/components/layout/ScreenWrapper";

const EditProfileScreen = () => {
  return (
    <ScreenWrapper header={<Header />}>
      <EditProfileForm />
    </ScreenWrapper>
  );
};
export default EditProfileScreen;
