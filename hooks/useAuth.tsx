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
          statusCode: "LOGIN_ERROR",
          source: "useAuth/login",
          type: "auth",
        })
      );
    }
  };

  const signup = async (email: string, username: string) => {
    try {
      await dispatch(signupThunk({ email, username })).unwrap();
      router.push({
        pathname: "/(app)/VerificationCode",
        params: {
          email: email,
        },
      });
    } catch (error) {
      dispatch(
        addError({
          message: "Error signing up. Please try again.",
          statusCode: "SIGNUP_ERROR",
          source: "useAuth/signup",
          type: "auth",
        })
      );
    }
  };

  const verifyOTP = async (otp: string, email: string) => {
    try {
      await dispatch(verifyOTPThunk({ email, token: otp })).unwrap();
    } catch (error) {
      dispatch(
        addError({
          message: "Error verifying OTP. Please try again.",
          statusCode: "VERIFY_OTP_ERROR",
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
          statusCode: "LOGOUT_ERROR",
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
