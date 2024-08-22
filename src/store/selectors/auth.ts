import type { LazyLoadedSlices } from "@/types/store";
import type { User } from "@supabase/auth-js";

export const selectUser = ({ auth }: LazyLoadedSlices): User | null => auth?.user || null;
