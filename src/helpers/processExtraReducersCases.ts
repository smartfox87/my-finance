import { SerializedError } from "@reduxjs/toolkit";
import { IncomesSliceState } from "@/store/incomesSlice";
import { AccountsSliceState } from "@/store/accountsSlice";
import { BudgetsSliceState } from "@/store/budgetsSlice";
import { AuthSliceState } from "@/store/authSlice";
import { ProfileSliceState } from "@/store/profileSlice";
import { ReferencesSliceState } from "@/store/referencesSlice";
import { CostsSliceState } from "@/store/costsSlice";
import { StatisticsSliceState } from "@/store/statisticsSlice";
import { showErrorMessage } from "@/helpers/message";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState | CostsSliceState | StatisticsSliceState;

export const handleRejected = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  const errorText = payload || error.message;
  if (errorText) showErrorMessage(errorText, 8);
};
