import AppTitle from "@/components/UI/AppTitle";
import BackButtonIcon from "@/components/buttons/BackButtonIcon";
import CodeInput from "@/components/form/CodeInput";
import ThemedText from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Box } from "@/components/gluestack/box";

const VerificationCodeScreen = () => {
  const router = useRouter();
  const { loading, verifyOTP } = useAuth();
  const { email } = useLocalSearchParams();

  const handleCodeFilled = async (code: string) => {
    if (loading) return;
    try {
      await verifyOTP(code, email as string);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <Box className="flex-1 bg-backrgound py-safe-offset-4 px-4">
      <BackButtonIcon onPress={() => router.back()} />
      <AppTitle />
      <ThemedText
        className="text-center mt-12"
        size="body"
        weight="semi-bold">
        Verify Account
      </ThemedText>
      <Image
        source={require("@/assets/images/verifyEmail.png")}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
        }}
        contentFit="contain"
      />
      <ThemedText
        className="text-center mt-8 mb-4"
        size="bodyS"
        weight="regular">
        Please enter the verification number we send to your email
      </ThemedText>
      <CodeInput
        onCodeFilled={handleCodeFilled}
        loading={loading}
      />
    </Box>
  );
};

export default VerificationCodeScreen;
