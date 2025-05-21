import ThemedButton from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import ThemedText from "@/components/ThemedText";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/lib/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  async function signInWithEmail() {
    // setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: "nypelsa@gmail.com",
      password: "123456",
    });

    if (error) Alert.alert(error.message);
    // setLoading(false);
  }

  return (
    <Box className="flex-1 bg-backrgound pt-safe-offset-4 px-4">
      <Box className="">
        <ThemedText
          size="headingXL"
          weight="bold"
          className="text-primary-0 text-center"
        >
          TASK-WAN
        </ThemedText>
        <ThemedText weight="medium" color="secondary" className="text-center">
          Management App
        </ThemedText>
      </Box>
      <Box className="mt-12">
        <ThemedText className="text-center">Login to your account</ThemedText>
        <VStack className="mt-8 gap-4">
          <ThemedInput
            leftIcon={<Ionicons name="mail" size={24} color="white" />}
            placeholder="Email"
          />
          <ThemedInput
            leftIcon={<Ionicons name="lock-closed" size={24} color="white" />}
            placeholder="Password"
          />
          <ThemedButton title="Login" />
        </VStack>
      </Box>
      <HStack className="items-center mt-8 px-8">
        <Divider className="my-0.5 bg-slate-400 flex-1" />
        <ThemedText size="bodyS" weight="medium" className="mx-2">
          Or login with
        </ThemedText>
        <Divider className="my-0.5 bg-slate-400 flex-1" />
      </HStack>
      <Box className="mt-8">
        <ThemedText className="text-center">Third party Here</ThemedText>
      </Box>
      <Box>
        <ThemedText className="text-center mt-8">
          Don't have an account?{" "}
          <ThemedText
            weight="bold"
            onPress={() => router.navigate("/(app)/Register")}
            className="underline"
          >
            Sign Up
          </ThemedText>
        </ThemedText>
      </Box>
    </Box>
  );
};

export default LoginScreen;
