import { HStack } from "@/components/gluestack/hstack";
import SocialAuthButton from "@/components/buttons/SocialAuthButton";

const LoginThirdParty = () => {
  return (
    <HStack className="items-center justify-around mt-8 w-full">
      <SocialAuthButton provider="google" />
      <SocialAuthButton provider="apple" />
    </HStack>
  );
};

export default LoginThirdParty;
