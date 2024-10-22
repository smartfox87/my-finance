import { apiClient } from "@/libs/api-client";
import { getUserId } from "@/utils/get-user-id";
import { getFromPeriodApiValues } from "@/utils/get-from-period-api-values";
import { getToPeriodApiValues } from "@/utils/get-to-period-api-values";
import { FieldIds } from "@/features/default-form";
import type { FilterPeriodStateItem } from "@/features/filter";

export const getCostsListForChartsApi = (filter: FilterPeriodStateItem) => {
  const [from, to] = filter[FieldIds.PERIOD];
  return apiClient.from("costs").select("amount, date, category, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);
};

export const getIncomesListForChartsApi = (filter: FilterPeriodStateItem) => {
  const [from, to] = filter[FieldIds.PERIOD];
  return apiClient.from("incomes").select("category, date, amount, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);
};

export const getBudgetsListForChartsApi = (filter: FilterPeriodStateItem) =>
  apiClient
    .from("view_budgets")
    .select("name, amount, period, categories, accounts")
    .match({ user_id: getUserId() })
    .rangeGte("period", getFromPeriodApiValues(filter[FieldIds.PERIOD]))
    .rangeLte("period", getToPeriodApiValues(filter[FieldIds.PERIOD]));
