import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(Cypress.env("NEXT_PUBLIC_SUPABASE_URL"), Cypress.env("SUPABASE_KEY_SERVICE"));
