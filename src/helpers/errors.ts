import { SerializedError } from "@reduxjs/toolkit";
import { i18nRef } from "@/i18n";
import { showErrorMessage } from "@/helpers/message";
import { showNotification } from "@/helpers/modals";
import { NotificationTypes } from "@/types/modals";
import type { AccountsSliceState } from "@/types/accounts";
import type { ProfileSliceState } from "@/types/profile";
import type { IncomesSliceState } from "@/types/incomes";
import type { BudgetsSliceState } from "@/types/budgets";
import type { ReferencesSliceState } from "@/types/references";
import type { StatisticsSliceState } from "@/types/statistics";
import type { AuthSliceState } from "@/types/auth";
import type { CostsSliceState } from "@/types/costs";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState | CostsSliceState | StatisticsSliceState;

export const handleRejectedReducerAction = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  const errorText = payload || error.message;
  if (errorText) showErrorMessage(errorText, 8);
};

export const showCommonError = (title?: string): void => {
  if (title) showNotification({ title, type: NotificationTypes.ERROR });
  else if (i18nRef.t) showNotification({ title: i18nRef.t("notifications.error.common"), type: NotificationTypes.ERROR });
};
