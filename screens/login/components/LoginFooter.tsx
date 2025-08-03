import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { Box } from "@/components/gluestack/box";
import Text from "@/components/Text";

const LoginFooter = () => {
  const router = useRouter();
  const isLoading = useSelector(selectAuthStatus);

  return (
    <Box className="flex-row justify-center items-center gap-1">
      <Text className="text-center mt-8" testID="login-footer">
        Don't have an account?{" "}
      </Text>
      <Text
        testID="login-footer-signup"
        weight="bold"
        onPress={() => router.navigate("/(app)/Register")}
        disabled={isLoading}
        className="underline mt-8"
      >
        Sign Up
      </Text>
    </Box>
  );
};

export default LoginFooter;
