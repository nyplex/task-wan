import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import useAuth from "@/hooks/useAuth";
import Text from "@/components/Text";

const ResendCodeBtn = () => {
  const { email } = useLocalSearchParams();
  const { resendOTP } = useAuth();
  const isLoading = useSelector(selectAuthStatus);

  const [countdown, setCountdown] = useState(60);
  const [hasResent, setHasResent] = useState(false);
  const [status, setStatus] = useState<"idle" | "resending" | "sent">("idle");

  // Start countdown on mount
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    setStatus("resending");
    await resendOTP(email as string);
    setStatus("sent");
    setHasResent(true);
  };

  const getButtonLabel = () => {
    if (status === "resending") return "Resending...";
    if (status === "sent") return "Code sent";
    if (countdown > 0) return `Resend code in ${countdown}s...`;
    return "Resend Code";
  };

  const isDisabled = isLoading || status === "resending" || countdown > 0 || hasResent;

  return (
    <Text
      className={`text-center ${isDisabled ? "opacity-40" : ""}`}
      weight="bold"
      size="bodyXS"
      disabled={isDisabled}
      onPress={!isDisabled ? handleResend : undefined}>
      {getButtonLabel()}
    </Text>
  );
};

export default ResendCodeBtn;
