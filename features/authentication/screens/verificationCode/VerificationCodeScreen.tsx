import { Box } from "@/gluestack-ui/box";
import Header from "./components/VerificationHeader";
import BodyContent from "./components/VerificationContent";
import CodeForm from "./components/VerificationForm";
import ResendCodeBtn from "./components/VerificationResendButton";

const VerificationCodeScreen = () => {
  return (
    <Box className="flex-1 bg-background py-safe-offset-4 px-4">
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
