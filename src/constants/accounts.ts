import type { AccountField } from "@/types/accounts";

export const INITIAL_ACCOUNT_FIELDS: AccountField[] = [
  { id: "name", label_translation: "simple.name", value: "", maxLength: 200, type: "text", required: true, focus: true },
  { id: "balance", label_translation: "simple.balance", value: "", type: "number", required: true },
];
