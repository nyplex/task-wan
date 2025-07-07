import { Box } from "@/components/gluestack/box";
import Text from "@/components/Text";
import Divider from "@/components/layout/Divider";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";

const RegisterScreen = () => {
  return (
    <Box className="flex-1 bg-backrgound py-safe-offset-4 px-4">
      <Header />
      <Text
        weight="semi-bold"
        className="text-center mt-12">
        Create your account
      </Text>
      <RegisterForm />
      <Box className="mt-12 items-center">
        <Divider
          title="Or register with"
          width="80%"
        />
        <Box className="mt-8">
          <Text className="text-center">Third party Here</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
