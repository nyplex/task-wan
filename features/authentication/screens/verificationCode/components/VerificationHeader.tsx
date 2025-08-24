import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/features/authentication/authSlice/authSelectors";
import { Box } from "@/gluestack-ui/box";
import AppTitle from "@/components/UI/AppTitle";
import BackButtonIcon from "@/components/buttons/BackButtonIcon";

const VerificationCode = () => {
  const router = useRouter();
  const isLoading = useSelector(selectAuthStatus);

  return (
    <Box>
      <BackButtonIcon onPress={() => router.back()} disabled={isLoading} />
      <Box className="mt-4">
        <AppTitle />
      </Box>
    </Box>
  );
};

export default VerificationCode;
