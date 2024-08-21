import { supabaseClient } from "@/api/supabaseClient";
import { getUserId } from "@/helpers/localStorage";
import { getFromPeriodDatesForApi, getToPeriodDatesForApi } from "@/helpers/date";
import { FilterPeriodStateItem } from "@/types/filter";
import { FieldIds } from "@/types/field";

export const getCostsListForChartsApi = (filter: FilterPeriodStateItem) => {
  const [from, to] = filter[FieldIds.PERIOD];
  return supabaseClient.from("costs").select("amount, date, category, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);
};

export const getIncomesListForChartsApi = (filter: FilterPeriodStateItem) => {
  const [from, to] = filter[FieldIds.PERIOD];
  return supabaseClient.from("incomes").select("category, date, amount, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);
};

export const getBudgetsListForChartsApi = (filter: FilterPeriodStateItem) =>
  supabaseClient
    .from("view_budgets")
    .select("name, amount, period, categories, accounts")
    .match({ user_id: getUserId() })
    .rangeGte("period", getFromPeriodDatesForApi(filter[FieldIds.PERIOD]))
    .rangeLte("period", getToPeriodDatesForApi(filter[FieldIds.PERIOD]));
