import { message } from "antd";
import { SerializedError } from "@reduxjs/toolkit";
import { IncomesSliceState } from "@/store/incomesSlice";
import { AccountsSliceState } from "@/store/accountsSlice";
import { BudgetsSliceState } from "@/store/budgetsSlice";
import { AuthSliceState } from "@/store/authSlice";
import { ProfileSliceState } from "@/store/profileSlice";
import { ReferencesSliceState } from "@/store/referencesSlice";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState;

export const handleRejected = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  message.error(typeof payload === "string" ? payload : error.message, 8);
};
