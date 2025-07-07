import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "./redux";
import { initializeAuthThunk } from "@/redux/slices/authSlice/authThunks";

const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUserId = session?.user?.id || null;

      if (session === null) {
        dispatch(initializeAuthThunk(null));
        return;
      }

      if (lastUserId.current !== currentUserId) {
        lastUserId.current = currentUserId;
        dispatch(initializeAuthThunk(session));
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return null;
};

export default useAuthListener;
0;
