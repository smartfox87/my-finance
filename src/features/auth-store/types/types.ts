import { type TextFormField, FieldIds, FieldTypes } from "@/features/fields";
import type { Session, User } from "@supabase/auth-js";

export type LoginData = {
  [FieldIds.EMAIL]: string;
  [FieldIds.PASSWORD]: string;
};

export type RegisterData = LoginData & {
  score: number;
  [FieldIds.FULL_NAME]: string;
};

export interface UserPayload {
  user: User | null;
}

export interface SessionPayload {
  session: Session | null;
}

export type LoginField = TextFormField<FieldIds.EMAIL, FieldTypes.EMAIL> | TextFormField<FieldIds.PASSWORD, FieldTypes.PASSWORD>;

export type RegisterField = LoginField | TextFormField<FieldIds.FULL_NAME, FieldTypes.TEXT>;

export interface AuthSliceState {
  user: User | null;
}
