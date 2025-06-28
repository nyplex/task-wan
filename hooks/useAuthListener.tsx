import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "./redux";
import { initializeAuthThunk } from "@/redux/slices/authSlice/authThunks";

const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const lastSessionUserId = useRef<string | null>(null);
  const lastSessionToken = useRef<string | null>(null);
  const handledInitialSession = useRef(false);
  const dispatchTimeout = useRef<number | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (handledInitialSession.current) return;
        handledInitialSession.current = true;
      }

      const currentUserId = session?.user.id ?? null;
      const currentAccessToken = session?.access_token ?? null;

      // Avoid redundant dispatch if user ID and token are the same
      if (
        (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
        currentUserId === lastSessionUserId.current &&
        currentAccessToken === lastSessionToken.current
      ) {
        return; // No change, skip
      }

      lastSessionUserId.current = currentUserId;
      lastSessionToken.current = currentAccessToken;

      // Clear any pending dispatch to debounce rapid events
      if (dispatchTimeout.current) clearTimeout(dispatchTimeout.current);

      dispatchTimeout.current = setTimeout(() => {
        dispatch(initializeAuthThunk(session));
        dispatchTimeout.current = null;
      }, 100); // 100ms debounce
    });

    return () => {
      data.subscription.unsubscribe();
      if (dispatchTimeout.current) clearTimeout(dispatchTimeout.current);
    };
  }, [dispatch]);

  return null;
};

export default useAuthListener;
