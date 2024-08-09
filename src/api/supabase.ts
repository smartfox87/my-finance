import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided.");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: { headers: { Prefer: "return=representation" } },
});
//todo rename file to index.ts
