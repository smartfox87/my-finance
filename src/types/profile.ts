import { Period } from "@/helpers/date";

export interface ProfileData {
  full_name: string | null;
  birthdate: string | null;
  gender: string | null;
  period: Period | null;
  currency: number | null;
}

interface Currency {
  id: number;
  code: string;
  symbol: string;
}

export interface Profile {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  full_name: string | null;
  birthdate: string | null;
  gender: string | null;
  period: Period | null;
  currency: Currency | Currency[] | null;
}
