import { useRouter } from "expo-router";
import HeaderLayout from "@/components/layout/HeaderLayout";

const Header = () => {
  const navigation = useRouter();
  return (
    <HeaderLayout
      onPressIcon={() => navigation.back()}
      title="My Profile"
      icon="arrow-left"
    />
  );
};
export default Header;
