import { Box } from "@/gluestack-ui/box";
import { HStack } from "@/gluestack-ui/hstack";
import Text from "@/components/UI/Text";
import Divider from "@/components/layout/Divider";
import RegisterHeader from "./components/RegisterHeader";
import RegisterForm from "./components/RegisterForm";
import SocialAuthButton from "@/components/buttons/SocialAuthButton";

const RegisterScreen = () => {
  return (
    <Box className="flex-1 bg-background pt-safe-offset-4 px-4">
      <RegisterHeader />
      <Text weight="semi-bold" className="text-center">
        Create your account
      </Text>
      <RegisterForm />
      <Box className="mt-12 items-center">
        <Divider title="Or register with" width="80%" />
        <HStack className="items-center justify-around mt-12 w-full">
          <SocialAuthButton provider="google" />
          <SocialAuthButton provider="apple" />
        </HStack>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
