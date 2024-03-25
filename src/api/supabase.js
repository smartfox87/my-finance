import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const fetch = (url, options = {}) => {
  return window.fetch(url, options).then((response) => {
    if (!response.ok && url.includes("grant_type=refresh_token")) {
      // const authStore = useAuthStore();
      // authStore.logout(false);
    }
    return response;
  });
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: { fetch, headers: { Prefer: "return=representation" } },
});
