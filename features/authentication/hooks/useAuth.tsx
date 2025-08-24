import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/redux";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";
import { selectSession } from "@/features/authentication/authSlice/authSelectors";
import { loginThunk } from "@/features/authentication/authSlice/thunks/loginThunk";
import { signupThunk } from "@/features/authentication/authSlice/thunks/signupThunk";
import { verifyOTPThunk } from "@/features/authentication/authSlice/thunks/verifyOTPThunk";
import { resendOTPThunk } from "@/features/authentication/authSlice/thunks/resendOTPThunk";
import { logoutThunk } from "@/features/authentication/authSlice/thunks/logoutThunk";
import { setIsLoading } from "@/features/authentication/authSlice/authSlice";
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
        pathname: "/(auth)/verificationCode",
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
        pathname: "/(auth)/verificationCode",
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
