import { supabase } from "@/api/supabase";
import { getUserId } from "@/helpers/localStorage.js";
import { DatesValues, getFromPeriodDatesForApi, getToPeriodDatesForApi } from "@/helpers/date";

export const getCostsListForChartsApi = ({ period: [from, to] }: { period: DatesValues }) =>
  supabase.from("costs").select("amount, date, category, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);

export const getIncomesListForChartsApi = ({ period: [from, to] }: { period: DatesValues }) =>
  supabase.from("incomes").select("category, date, amount, account").match({ user_id: getUserId() }).gte("date", from).lte("date", to);

export const getBudgetsListForChartsApi = ({ period }: { period: DatesValues }) =>
  supabase
    .from("view_budgets")
    .select("name, amount, period, categories")
    .match({ user_id: getUserId() })
    .rangeGte("period", getFromPeriodDatesForApi(period))
    .rangeLte("period", getToPeriodDatesForApi(period));
