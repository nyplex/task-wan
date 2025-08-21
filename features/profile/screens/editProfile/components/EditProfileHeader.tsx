import { useRouter } from "expo-router";
import HeaderLayout from "@/components/layout/HeaderLayout";

const EditProfileHeader = () => {
  const navigation = useRouter();
  return (
    <HeaderLayout
      onPressIcon={() => navigation.back()}
      title="My Profile"
      icon="arrow-left"
    />
  );
};
export default EditProfileHeader;
