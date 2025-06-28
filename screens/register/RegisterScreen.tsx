import AppTitle from "@/components/UI/AppTitle";
import BackButtonIcon from "@/components/buttons/BackButtonIcon";
import Button from "@/components/buttons/Button";
import ThemedInput from "@/components/form/Input";
import ThemedText from "@/components/Text";
import { VStack } from "@/components/gluestack/vstack";
import useAuth from "@/hooks/useAuth";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Box } from "@/components/gluestack/box";

const RegisterScreen = () => {
  const router = useRouter();
  const loading = useSelector(selectAuthStatus);
  const { signup } = useAuth();

  const handleRegister = async () => {
    await signup("nypels.alexandre@outlook.com", "Alexandre");
  };

  return (
    <Box className="flex-1 bg-backrgound py-safe-offset-4 px-4">
      <BackButtonIcon onPress={() => router.back()} />
      <AppTitle />
      <ThemedText
        weight="semi-bold"
        className="text-center mt-12">
        Create your account
      </ThemedText>
      <VStack className="gap-8 mb-8 mt-4 flex-1">
        <ThemedInput
          placeholder="Username"
          leftIcon={
            <FontAwesome6
              name="user-large"
              size={24}
              color="white"
            />
          }
        />
        <ThemedInput
          placeholder="Email"
          leftIcon={
            <Ionicons
              name="mail"
              size={24}
              color="white"
            />
          }
        />
        <ThemedInput
          placeholder="Password"
          leftIcon={
            <Ionicons
              name="lock-closed"
              size={24}
              color="white"
            />
          }
        />
        <ThemedInput
          placeholder="Confirm Password"
          leftIcon={
            <Ionicons
              name="lock-closed"
              size={24}
              color="white"
            />
          }
        />
      </VStack>
      <Button
        title="Register"
        isLoading={loading}
        onPress={handleRegister}
      />
    </Box>
  );
};

export default RegisterScreen;
