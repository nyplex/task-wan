import { selectSession } from "@/redux/slices/authSlice/authSelectors";
import { useAppDispatch } from "./redux";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";
import { loginThunk } from "@/redux/slices/authSlice/thunks/loginThunk";
import { signupThunk } from "@/redux/slices/authSlice/thunks/signupThunk";
import { verifyOTPThunk } from "@/redux/slices/authSlice/thunks/verifyOTPThunk";
import { resendOTPThunk } from "@/redux/slices/authSlice/thunks/resendOTPThunk";
import { logoutThunk } from "@/redux/slices/authSlice/thunks/logoutThunk";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { setIsLoading } from "@/redux/slices/authSlice/authSlice";
import { GlobalError } from "@/types/errors";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useSelector(selectSession)?.user;

  const login = async (email: string) => {
    try {
      dispatch(setIsLoading(true));
      await dispatch(
        loginThunk({
          email,
        }),
      ).unwrap();

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
            message: "An unknown error occurred during login.",
            source: "useAuth/login",
            type: "auth",
          }),
        );
      } else {
        const typedError = error as GlobalError;
        dispatch(
          addError({
            message: typedError.message,
            source: typedError.source,
            type: typedError.type,
          }),
        );
      }
    } finally {
      dispatch(setIsLoading(false));
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
          }),
        );
      } else {
        const typedError = error as GlobalError;
        dispatch(
          addError({
            message: typedError.message,
            source: typedError.source,
            type: typedError.type,
          }),
        );
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const verifyOTP = async (otp: string, email: string) => {
    try {
      dispatch(setIsLoading(true));
      await dispatch(verifyOTPThunk({ email: email, token: otp })).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          addError({
            message: "An unknown error occurred during verification.",
            source: "useAuth/verifyOTP",
            type: "auth",
          }),
        );
      } else {
        const typedError = error as GlobalError;
        dispatch(
          addError({
            message: typedError.message,
            source: typedError.source,
            type: typedError.type,
          }),
        );
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const resendOTP = async (email: string) => {
    try {
      dispatch(setIsLoading(true));
      await dispatch(resendOTPThunk({ email })).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          addError({
            message: "An unknown error occurred during resending OTP.",
            source: "useAuth/resendOTP",
            type: "auth",
          }),
        );
      } else {
        const typedError = error as GlobalError;
        dispatch(
          addError({
            message: typedError.message,
            source: typedError.source,
            type: typedError.type,
          }),
        );
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const logout = async () => {
    try {
      dispatch(setIsLoading(true));
      await dispatch(logoutThunk()).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          addError({
            message: "An unknown error occurred during logout.",
            source: "useAuth/logout",
            type: "auth",
          }),
        );
      } else {
        const typedError = error as GlobalError;
        dispatch(
          addError({
            message: typedError.message,
            source: typedError.source,
            type: typedError.type,
          }),
        );
      }
    } finally {
      dispatch(setIsLoading(false));
    }
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
