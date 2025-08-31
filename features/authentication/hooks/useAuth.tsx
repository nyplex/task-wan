import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/redux";
import { selectSession } from "@/features/authentication/authSlice/authSelectors";
import { loginThunk } from "@/features/authentication/authSlice/thunks/loginThunk";
import { signupThunk } from "@/features/authentication/authSlice/thunks/signupThunk";
import { verifyOTPThunk } from "@/features/authentication/authSlice/thunks/verifyOTPThunk";
import { resendOTPThunk } from "@/features/authentication/authSlice/thunks/resendOTPThunk";
import { logoutThunk } from "@/features/authentication/authSlice/thunks/logoutThunk";
import { setIsLoading } from "@/features/authentication/authSlice/authSlice";
import { safe } from "@/lib/safe";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useSelector(selectSession)?.user;

  const login = async (email: string) => {
    safe(
      async () => {
        dispatch(setIsLoading(true));
        await dispatch(
          loginThunk({
            email,
          }),
        ).unwrap();

        router.push({
          pathname: "/(auth)/verificationCode",
          params: {
            email: email,
          },
        });
        dispatch(setIsLoading(false));
      },
      dispatch,
      "Failed to login",
      () => {
        dispatch(setIsLoading(false));
      },
    );
  };

  const signup = async (email: string, username: string) => {
    safe(
      async () => {
        dispatch(setIsLoading(true));
        await dispatch(signupThunk({ email, username })).unwrap();
        router.push({
          pathname: "/(auth)/verificationCode",
          params: {
            email: email,
          },
        });
        dispatch(setIsLoading(false));
      },
      dispatch,
      "Failed to signup",
      () => {
        dispatch(setIsLoading(false));
      },
    );
  };

  const verifyOTP = async (otp: string, email: string) => {
    safe(
      async () => {
        dispatch(setIsLoading(true));
        await dispatch(verifyOTPThunk({ email: email, token: otp })).unwrap();
        dispatch(setIsLoading(false));
      },
      dispatch,
      "Failed to verify OTP",
      () => {
        dispatch(setIsLoading(false));
      },
    );
  };

  const resendOTP = async (email: string) => {
    safe(
      async () => {
        dispatch(setIsLoading(true));
        await dispatch(resendOTPThunk({ email })).unwrap();
        dispatch(setIsLoading(false));
      },
      dispatch,
      "Failed to resend OTP",
      () => {
        dispatch(setIsLoading(false));
      },
    );
  };

  const logout = async () => {
    safe(
      async () => {
        dispatch(setIsLoading(true));
        await dispatch(logoutThunk()).unwrap();
        dispatch(setIsLoading(false));
      },
      dispatch,
      "Failed to logout",
      () => {
        dispatch(setIsLoading(false));
      },
    );
  };

  return {
    login,
    signup,
    verifyOTP,
    resendOTP,
    logout,
    user,
  };
};

export default useAuth;
