import { Session, User } from "@supabase/auth-js";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  score: number;
  full_name?: string;
};

export interface UserPayload {
  user: User | null;
}

export interface SessionPayload {
  session: Session | null;
}
