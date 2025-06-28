import ThemedText from "@/components/Text";
import { Divider } from "@/components/gluestack/divider";
import { HStack } from "@/components/gluestack/hstack";

const LoginDivider = () => {
  return (
    <HStack className="items-center mt-8 px-8">
      <Divider className="my-0.5 bg-slate-400 flex-1" />
      <ThemedText
        size="bodyS"
        weight="medium"
        className="mx-2">
        Or login with
      </ThemedText>
      <Divider className="my-0.5 bg-slate-400 flex-1" />
    </HStack>
  );
};

export default LoginDivider;
