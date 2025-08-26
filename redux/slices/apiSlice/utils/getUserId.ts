import { supabase } from "@/lib/supabase";

export async function getUserId() {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}
