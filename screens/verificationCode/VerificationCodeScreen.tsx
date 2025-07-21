import { Box } from "@/components/gluestack/box";
import Header from "./components/Header";
import BodyContent from "./components/BodyContent";
import CodeForm from "./components/CodeForm";
import ResendCodeBtn from "./components/ResendCodeBtn";

const VerificationCodeScreen = () => {
  return (
    <Box className="flex-1 bg-backrgound py-safe-offset-4 px-4">
      <Header />
      <BodyContent />
      <CodeForm />
      <Box className="mt-12">
        <ResendCodeBtn />
      </Box>
    </Box>
  );
};

export default VerificationCodeScreen;
