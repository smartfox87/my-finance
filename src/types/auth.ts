import { Session, User } from "@supabase/auth-js";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  score: number;
  full_name?: string;
}

export interface UserPayload {
  user: User | null;
}

export interface SessionPayload {
  session: Session | null;
}
