import { SerializedError } from "@reduxjs/toolkit";
import { IncomesSliceState } from "@/store/incomesSlice";
import { BudgetsSliceState } from "@/store/budgetsSlice";
import { AuthSliceState } from "@/store/authSlice";
import { ReferencesSliceState } from "@/store/referencesSlice";
import { CostsSliceState } from "@/store/costsSlice";
import { StatisticsSliceState } from "@/store/statisticsSlice";
import { showErrorMessage } from "@/helpers/message";
import { AccountsSliceState } from "@/types/accounts";
import { ProfileSliceState } from "@/types/profile";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState | CostsSliceState | StatisticsSliceState;

export const handleRejectedReducerAction = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  const errorText = payload || error.message;
  if (errorText) showErrorMessage(errorText, 8);
};
