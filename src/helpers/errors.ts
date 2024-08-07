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
import { showNotification } from "@/helpers/modals";
import { i18nRef } from "@/i18n";

type State = IncomesSliceState | AccountsSliceState | BudgetsSliceState | AuthSliceState | ProfileSliceState | ReferencesSliceState | CostsSliceState | StatisticsSliceState;

export const handleRejectedReducerAction = (state: State, { payload, error }: { payload?: string; error: SerializedError }) => {
  const errorText = payload || error.message;
  if (errorText) showErrorMessage(errorText, 8);
};

export const showCommonError = (title: string): void => {
  if (title) showNotification({ title, type: "error" });
  else if (i18nRef.t) showNotification({ title: i18nRef.t("notifications.error.common"), type: "error" });
};
