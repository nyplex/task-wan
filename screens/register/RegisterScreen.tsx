import { Box } from "@/components/gluestack/box";
import { HStack } from "@/components/gluestack/hstack";
import { CLASS_NAMES } from "@/constants/CLASS_NAMES";
import Text from "@/components/Text";
import Divider from "@/components/layout/Divider";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import SocialAuthButton from "@/components/buttons/SocialAuthButton";

const RegisterScreen = () => {
  return (
    <Box className={CLASS_NAMES.DEFAULT_SCREEN_WRAPPER}>
      <Header />
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
