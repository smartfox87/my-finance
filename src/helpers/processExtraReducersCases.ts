import { message } from "antd";
import { SerializedError } from "@reduxjs/toolkit";
import { IncomesSliceState } from "@/store/incomesSlice";
import { AccountsSliceState } from "@/store/accountsSlice";
import { BudgetsSliceState } from "@/store/budgetsSlice";
import { AuthSliceState } from "@/store/authSlice";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState;

export const handleRejected = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  message.error(typeof payload === "string" ? payload : error.message, 8);
};
