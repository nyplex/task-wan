import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import CodeInput from "@/components/form/CodeInput";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const CodeForm = () => {
  const isLoading = useSelector(selectAuthStatus);
  const { email } = useLocalSearchParams();
  const { verifyOTP } = useAuth();
  const [code, setCode] = useState("");

  const handleCodeFilled = async (code: string) => {
    await verifyOTP(code, email as string);
    setCode("");
  };

  return (
    <CodeInput
      onValueChange={(value) => {
        setCode(value);
        if (value.length === 6) {
          handleCodeFilled(value);
        }
      }}
      currentValue={code}
      disabled={isLoading}
    />
  );
};

export default CodeForm;
