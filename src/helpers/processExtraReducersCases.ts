import { message } from "antd";
import { SerializedError } from "@reduxjs/toolkit";
import { IncomesSliceState } from "@/store/incomesSlice";
import { AccountsSliceState } from "@/store/accountsSlice";
import { BudgetsSliceState } from "@/store/budgetsSlice";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState;

export const handleRejected = (state: State, { type, payload, error }: { type: string; payload?: string | unknown; error: SerializedError }) => {
  console.error(type, payload || error);
  message.error(payload || error.message, 8);
};
