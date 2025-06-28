import { useRouter } from "expo-router";
import { Box } from "@/components/gluestack/box";
import ThemedText from "@/components/Text";

const LoginFooter = () => {
  const router = useRouter();

  return (
    <Box>
      <ThemedText className="text-center mt-8">
        Don't have an account?{" "}
        <ThemedText
          weight="bold"
          onPress={() => router.navigate("/(app)/Register")}
          className="underline">
          Sign Up
        </ThemedText>
      </ThemedText>
    </Box>
  );
};

export default LoginFooter;
