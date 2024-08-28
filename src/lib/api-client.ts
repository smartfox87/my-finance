import { createClient } from "@supabase/supabase-js";
import { API_KEY, API_URL } from "@/constants/api";

if (!API_URL || !API_KEY) throw new Error("API URL and Key must be provided.");

export const apiClient = createClient(API_URL, API_KEY, {
  global: { headers: { Prefer: "return=representation" } },
});
