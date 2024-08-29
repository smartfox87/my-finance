import { apiClient } from "@/lib/api-client";
import { getUserId } from "@/helpers/localStorage";
import { getFromPeriodDatesForApi, getToPeriodDatesForApi } from "@/helpers/date";
import { FilterPeriodStateItem } from "@/types/filter";
import { FieldIds } from "@/types/field";

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
    .rangeGte("period", getFromPeriodDatesForApi(filter[FieldIds.PERIOD]))
    .rangeLte("period", getToPeriodDatesForApi(filter[FieldIds.PERIOD]));
