import { supabase } from "@/api/supabase";
import { getUserId } from "@/helpers/localStorage.js";
import { getFromPeriodDatesForApi, getToPeriodDatesForApi } from "@/helpers/date";
import type { DatesStrings } from "@/types/date";

export const getCostsListForChartsApi = ({ period: [from, to] }: { period: DatesStrings }) =>
  supabase.from("costs").select("amount, date, category, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);

export const getIncomesListForChartsApi = ({ period: [from, to] }: { period: DatesStrings }) =>
  supabase.from("incomes").select("category, date, amount, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);

export const getBudgetsListForChartsApi = ({ period }: { period: DatesStrings }) =>
  supabase
    .from("view_budgets")
    .select("name, amount, period, categories")
    .match({ user_id: getUserId() })
    .rangeGte("period", getFromPeriodDatesForApi(period))
    .rangeLte("period", getToPeriodDatesForApi(period));
