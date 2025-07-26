import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "./redux";
import { initializeAuthThunk } from "@/redux/slices/authSlice/authThunks";

const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(initializeAuthThunk(session));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(initializeAuthThunk(session));
    });
  }, []);

  return null;
};

export default useAuthListener;
0;
