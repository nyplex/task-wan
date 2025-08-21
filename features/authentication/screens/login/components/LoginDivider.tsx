import { HStack } from "@/gluestack-ui/hstack";
import Divider from "@/components/layout/Divider";

const LoginDivider = () => {
  return (
    <HStack className="items-center mt-8 px-8" testID="login-divider">
      <Divider title="Or login with" />
    </HStack>
  );
};

export default LoginDivider;
