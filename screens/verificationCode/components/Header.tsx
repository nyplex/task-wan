import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { Box } from "@/components/gluestack/box";
import AppTitle from "@/components/UI/AppTitle";
import BackButtonIcon from "@/components/buttons/BackButtonIcon";

const Header = () => {
  const router = useRouter();
  const isLoading = useSelector(selectAuthStatus);

  return (
    <Box>
      <BackButtonIcon
        onPress={() => router.back()}
        disabled={isLoading}
      />
      <Box className="mt-4">
        <AppTitle />
      </Box>
    </Box>
  );
};

export default Header;
