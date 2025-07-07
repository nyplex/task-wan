import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { isValidEmail } from "@/utils/isValidEmail";
import { VStack } from "@/components/gluestack/vstack";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import useAuth from "@/hooks/useAuth";

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
      <Input
        value={email}
        onChangeText={(text) => {
          setEmail(text.trim());
          if (!emailTouched) setEmailTouched(true);
        }}
        leftIcon="mail"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        isInvalid={!!emailError}
        invalidText={emailError}
      />
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
