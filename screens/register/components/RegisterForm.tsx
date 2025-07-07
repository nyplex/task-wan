import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import { Box } from "@/components/gluestack/box";
import { VStack } from "@/components/gluestack/vstack";
import useAuth from "@/hooks/useAuth";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import { isValidEmail } from "@/utils/isValidEmail";
import { useState } from "react";
import { useSelector } from "react-redux";

const RegisterForm = () => {
  const isLoading = useSelector(selectAuthStatus);
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const emailError = emailTouched && !isValidEmail(email) ? "Invalid email format" : "";
  const [username, setUsername] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const usernameError =
    usernameTouched && !username.trim()
      ? "Username is required"
      : username.length > 20
        ? "Username must be 20 characters or less"
        : "";

  const handleRegister = async () => {
    await signup(email, username);
  };

  return (
    <VStack className="gap-2 mb-8 mt-4">
      <Input
        placeholder="Username"
        leftIcon="user"
        autoCorrect={false}
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (!usernameTouched) setUsernameTouched(true);
        }}
        invalidText={usernameError}
        isDisabled={isLoading}
        isInvalid={!!usernameError}
        maxLength={20}
      />
      <Input
        placeholder="Email"
        leftIcon="mail"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (!emailTouched) setEmailTouched(true);
        }}
        invalidText={emailError}
        isDisabled={isLoading}
        isInvalid={!!emailError}
      />
      <Box>
        <Button
          title="Register"
          isLoading={isLoading}
          onPress={handleRegister}
          disabled={!!emailError || !email || !!usernameError || !username || isLoading}
        />
      </Box>
    </VStack>
  );
};

export default RegisterForm;
