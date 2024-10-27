import { IS_PRODUCTION } from "@/constants/config";
import { captureException } from "@sentry/nextjs";
import { showErrorMessage } from "@/utils/show-error-message";
import type { SerializedError } from "@reduxjs/toolkit";
import type { AccountsSliceState } from "@/types/accounts";
import type { ProfileSliceState } from "@/features/profile";
import type { IncomesSliceState } from "@/features/incomes";
import type { BudgetsSliceState } from "@/features/budgets";
import type { ReferencesSliceState } from "@/types/references";
import type { StatisticsSliceState } from "@/features/statistics";
import type { AuthSliceState } from "@/features/auth-store";
import type { CostsSliceState } from "@/features/expenses";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState | CostsSliceState | StatisticsSliceState;

export const handleRejectedReducerAction = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  if (IS_PRODUCTION) captureException(error);
  const errorText = payload || error.message;
  if (errorText) showErrorMessage(errorText, 8);
};
