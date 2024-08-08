import { SerializedError } from "@reduxjs/toolkit";
import { IncomesSliceState } from "@/store/slices/incomesSlice";
import { BudgetsSliceState } from "@/store/slices/budgetsSlice";
import { AuthSliceState } from "@/store/slices/authSlice";
import { ReferencesSliceState } from "@/store/slices/referencesSlice";
import { CostsSliceState } from "@/store/slices/costsSlice";
import { StatisticsSliceState } from "@/store/slices/statisticsSlice";
import { showErrorMessage } from "@/helpers/message";
import { AccountsSliceState } from "@/types/accounts";
import { ProfileSliceState } from "@/types/profile";
import { showNotification } from "@/helpers/modals";
import { i18nRef } from "@/i18n";
import { NotificationTypes } from "@/types/modals";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState | CostsSliceState | StatisticsSliceState;

export const handleRejectedReducerAction = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  const errorText = payload || error.message;
  if (errorText) showErrorMessage(errorText, 8);
};

export const showCommonError = (title?: string): void => {
  if (title) showNotification({ title, type: NotificationTypes.ERROR });
  else if (i18nRef.t) showNotification({ title: i18nRef.t("notifications.error.common"), type: NotificationTypes.ERROR });
};
