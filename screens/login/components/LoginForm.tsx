import { useState } from "react";
import { VStack } from "@/components/gluestack/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/buttons/Button";
import ThemedInput from "@/components/form/Input";
import ThemedText from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import { isValidEmail } from "@/utils/isValidEmail";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";

const LoginForm = () => {
  const { login } = useAuth();
  const loading = useSelector(selectAuthStatus);

  const [email, setEmail] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = emailTouched && !isValidEmail(email) ? "Invalid email format" : "";

  const handleLogin = async () => {
    if (!isValidEmail(email)) return;
    await login(email);
  };

  return (
    <VStack className="mt-8 gap-4">
      <ThemedInput
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (!emailTouched) setEmailTouched(true);
        }}
        leftIcon={
          <Ionicons
            name="mail"
            size={24}
            color="white"
          />
        }
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        isInvalid={!!emailError}
      />
      {emailError && (
        <ThemedText
          className="text-red-500 -mt-4 ml-2 text-right"
          size="bodyXS"
          weight="medium">
          {emailError}
        </ThemedText>
      )}

      <Button
        title="Login"
        onPress={handleLogin}
        isLoading={loading}
        disabled={!!emailError || !email}
      />
    </VStack>
  );
};

export default LoginForm;
