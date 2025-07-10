import { selectSession } from "@/redux/slices/authSlice/authSelectors";
import { useAppDispatch } from "./redux";
import {
  loginThunk,
  logoutThunk,
  signupThunk,
  verifyOTPThunk,
} from "@/redux/slices/authSlice/authThunks";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { setIsLoading } from "@/redux/slices/authSlice/authSlice";
import { GlobalError } from "@/types/errors";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(selectSession)?.user;

  const login = async (email: string) => {
    try {
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
    } catch (error) {
      dispatch(
        addError({
          message: "Error logging in. Please try again.",
          status: "LOGIN_ERROR",
          source: "useAuth/login",
          type: "auth",
        })
      );
    }
  };

  const signup = async (email: string, username: string) => {
    try {
      dispatch(setIsLoading(true));
      await dispatch(signupThunk({ email, username })).unwrap();
      router.push({
        pathname: "/(app)/VerificationCode",
        params: {
          email: email,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          addError({
            message: "An unknown error occurred during signup.",
            source: "useAuth/signup",
            type: "auth",
          })
        );
      } else {
        const typedError = error as GlobalError;
        dispatch(
          addError({
            message: typedError.message,
            source: typedError.source,
            type: typedError.type,
          })
        );
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const verifyOTP = async (otp: string, email: string) => {
    try {
      await dispatch(verifyOTPThunk({ email, token: otp })).unwrap();
    } catch (error) {
      dispatch(
        addError({
          message: "Error verifying OTP. Please try again.",
          status: "VERIFY_OTP_ERROR",
          source: "useAuth/verifyOTP",
          type: "auth",
        })
      );
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
    } catch (error) {
      dispatch(
        addError({
          message: "Error logging out. Please try again.",
          status: "LOGOUT_ERROR",
          source: "useAuth/logout",
          type: "auth",
        })
      );
    }
  };

  return {
    login,
    signup,
    verifyOTP,
    logout,
    user,
  };
};

export default useAuth;
