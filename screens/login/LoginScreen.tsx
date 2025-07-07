import { Box } from "@/components/gluestack/box";
import AppTitle from "@/components/UI/AppTitle";
import ThemedText from "@/components/Text";
import LoginThirdParty from "./components/LoginThirdParty";
import LoginDivider from "./components/LoginDivider";
import LoginFooter from "./components/LoginFooter";
import LoginForm from "./components/LoginForm";

const LoginScreen = () => {
  return (
    <Box className="flex-1 bg-backrgound pt-safe-offset-4 px-4">
      <AppTitle />
      <Box className="mt-12">
        <ThemedText className="text-center">Login to your account</ThemedText>
      </Box>
      <LoginForm />
      <LoginDivider />
      <LoginThirdParty />
      <LoginFooter />
    </Box>
  );
};

export default LoginScreen;
