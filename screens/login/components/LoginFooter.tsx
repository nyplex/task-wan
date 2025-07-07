import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { Box } from "@/components/gluestack/box";
import Text from "@/components/Text";

const LoginFooter = () => {
  const router = useRouter();
  const isLoading = useSelector(selectAuthStatus);

  return (
    <Box>
      <Text className="text-center mt-8">
        Don't have an account?{" "}
        <Text
          weight="bold"
          onPress={() => router.navigate("/(app)/Register")}
          disabled={isLoading}
          className="underline">
          Sign Up
        </Text>
      </Text>
    </Box>
  );
};

export default LoginFooter;
