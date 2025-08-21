import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "@/hooks/redux";
import { initializeAuthThunk } from "../authSlice/thunks/initializeAuthThunk";

const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(initializeAuthThunk(session));
      },
    );
    return () => listener.subscription.unsubscribe?.();
  }, [dispatch]);

  return null;
};

export default useAuthListener;
