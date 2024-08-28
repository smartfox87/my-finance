import { createClient } from "@supabase/supabase-js";
import { API_KEY, API_URL } from "@/constants/config";

console.log("88888888888888888888888888888888888888", API_URL, API_KEY, process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASEKEY);

if (!API_URL || !API_KEY) throw new Error("API URL and Key must be provided.");

export const apiClient = createClient(API_URL, API_KEY, {
  global: { headers: { Prefer: "return=representation" } },
});
