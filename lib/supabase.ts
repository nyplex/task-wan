import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://emryohqgtvspntkqaxvc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcnlvaHFndHZzcG50a3FheHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MzMwMzUsImV4cCI6MjA2MzEwOTAzNX0.SaI2mnCUwK6F6yLw3kNPX7N0keIV7iYb_YSNotZewvQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
// AppState.addEventListener("change", (state) => {
//   if (state === "active") {
//     supabase.auth.startAutoRefresh();
//   } else {
//     supabase.auth.stopAutoRefresh();
//   }
// });
