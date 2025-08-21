import EditProfileHeader from "./components/EditProfileHeader";
import EditProfileForm from "./components/EditProfileForm";
import ScreenWrapper from "@/components/layout/ScreenWrapper";

const EditProfileScreen = () => {
  return (
    <ScreenWrapper header={<EditProfileHeader />}>
      <EditProfileForm />
    </ScreenWrapper>
  );
};
export default EditProfileScreen;
