import { useAppDispatch } from "./redux";
import {
  loginThunk,
  logoutThunk,
  signupThunk,
  verifyOTPThunk,
} from "@/redux/slices/authSlice/authThunks";
import { useRouter } from "expo-router";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (email: string) => {
    await dispatch(
      loginThunk({
        email,
      })
    ).unwrap();

    router.push({
      pathname: "/(app)/VerificationCode",
      params: {
        email: email,
      },
    });
  };

  const signup = async (email: string, username: string) => {
    await dispatch(signupThunk({ email, username })).unwrap();
    router.push({
      pathname: "/(app)/VerificationCode",
      params: {
        email: email,
      },
    });
  };

  const verifyOTP = async (otp: string, email: string) => {
    await dispatch(verifyOTPThunk({ email, token: otp })).unwrap();
  };

  const logout = async () => {
    await dispatch(logoutThunk()).unwrap();
  };

  return {
    login,
    signup,
    verifyOTP,
    logout,
  };
};

export default useAuth;
