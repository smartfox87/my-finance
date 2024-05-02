import { message } from "antd";
import { SerializedError } from "@reduxjs/toolkit";
import { IncomesSliceState } from "@/store/incomesSlice";
import { AccountsSliceState } from "@/store/accountsSlice";
import { BudgetsSliceState } from "@/store/budgetsSlice";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState;

export const handleRejected = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  const errorMessage = typeof payload === "string" ? payload : error.message;
  message.error(errorMessage, 8);
};
