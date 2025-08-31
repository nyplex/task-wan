import "react-native-url-polyfill/auto";
import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "@/hooks/redux";
import { initializeAuthThunk } from "../authSlice/thunks/initializeAuthThunk";
import { safe } from "@/lib/safe";
import * as Sentry from "@sentry/react-native";

const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const lastSessionId = useRef<string | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionId = session?.user.id ?? null;

        if (lastSessionId.current === sessionId) return;
        lastSessionId.current = sessionId;

        if (session) {
          Sentry.setUser({
            email: session.user.email || undefined,
            id: session.user.id,
          });
        } else {
          Sentry.setUser(null);
        }

        safe(
          async () => {
            await dispatch(initializeAuthThunk(session)).unwrap();
          },
          dispatch,
          "Failed to initialize authentication",
        );
      },
    );
    return () => listener.subscription.unsubscribe?.();
  }, [dispatch]);

  return null;
};

export default useAuthListener;
