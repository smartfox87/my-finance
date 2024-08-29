import { apiClient } from "@/lib/api-client";
import { getUserId } from "@/helpers/localStorage";
import { getCurrentDate } from "@/helpers/date";
import type { IncomeItemData } from "@/types/incomes";
import { FilterPeriodStateItem } from "@/types/filter";
import { FieldIds } from "@/types/field";

export const getIncomesListApi = (filter: FilterPeriodStateItem) => {
  const [from, to] = filter[FieldIds.PERIOD];
  return apiClient.from("incomes").select("created_at, id, name, category, date, amount, account").or(`user_id.eq.${getUserId()}`).order("id").gte("date", from).lte("date", to);
};

export const getIncomeItemApi = (incomeId: string) =>
  apiClient.from("incomes").select("id, name, category, date, amount, account, created_at, updated_at").match({ user_id: getUserId(), id: incomeId }).single();

export const createIncomeItemApi = (incomeData: IncomeItemData) =>
  apiClient
    .from("incomes")
    .insert({ ...incomeData, user_id: getUserId() })
    .select()
    .single();

export const deleteIncomeItemApi = async (incomeId: number) => {
  const { data, error } = await apiClient.from("incomes").delete().match({ user_id: getUserId(), id: incomeId }).select("created_at, id, name, category, date, amount, account").single();
  return { data, error };
};

export const updateIncomeItemApi = ({ incomeId, incomeData }: { incomeId: number; incomeData: IncomeItemData }) =>
  apiClient
    .from("incomes")
    .update({ ...incomeData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: incomeId })
    .select("id, name, category, date, amount, account, created_at, updated_at")
    .single();
