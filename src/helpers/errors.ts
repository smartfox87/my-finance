import { SerializedError } from "@reduxjs/toolkit";
import { i18nRef } from "@/i18n";
import { showErrorMessage } from "@/helpers/message";
import { showNotification } from "@/helpers/modals";
import { NotificationTypes } from "@/types/modals";
import type { AccountsSliceState } from "@/features/accounts";
import type { ProfileSliceState } from "@/features/profile";
import type { IncomesSliceState } from "@/features/incomes";
import type { BudgetsSliceState } from "@/features/budgets";
import type { ReferencesSliceState } from "@/types/references";
import type { StatisticsSliceState } from "@/features/statistics";
import type { AuthSliceState } from "@/types/auth";
import type { CostsSliceState } from "@/features/expenses";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState | CostsSliceState | StatisticsSliceState;

export const handleRejectedReducerAction = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  const errorText = payload || error.message;
  if (errorText) showErrorMessage(errorText, 8);
};

export const showCommonError = ({ title, error }: { title?: string; error?: unknown } = {}): void => {
  if (error) console.error(error);
  if (title) showNotification({ title, type: NotificationTypes.ERROR });
  else if (i18nRef.t) showNotification({ title: i18nRef.t("notifications.error.common"), type: NotificationTypes.ERROR });
};
