import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/redux/slices/authSlice/authSelectors";
import CodeInput from "@/components/form/CodeInput";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const CodeForm = () => {
  const { email } = useLocalSearchParams();
  const { verifyOTP } = useAuth();
  const [code, setCode] = useState("");
  const isLoading = useSelector(selectAuthStatus);

  const handleCodeFilled = async (code: string) => {
    setCode("");
    await verifyOTP(code, email as string);
  };

  return (
    <CodeInput
      onValueChange={(value) => {
        setCode(value);
        if (value.length === 6) {
          handleCodeFilled(value);
          setCode("");
        }
      }}
      currentValue={code}
      disabled={isLoading}
    />
  );
};

export default CodeForm;
