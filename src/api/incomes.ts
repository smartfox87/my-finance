import { supabase } from "@/api/supabase.js";
import { getUserId } from "@/helpers/localStorage.js";
import { DatesPeriod, getCurrentDate } from "@/helpers/date";
import { IncomeItemData } from "@/types/incomes";

export const getIncomesListApi = ({ period: [from, to] }: { period: DatesPeriod }) =>
  supabase.from("incomes").select("created_at, id, name, category, date, amount, account").or(`user_id.eq.${getUserId()}`).order("id").gte("date", from).lte("date", to);

export const getIncomeItemApi = (incomeId: string) =>
  supabase.from("incomes").select("id, name, category, date, amount, account, created_at, updated_at").match({ user_id: getUserId(), id: incomeId }).single();

export const createIncomeItemApi = (incomeData: IncomeItemData) =>
  supabase
    .from("incomes")
    .insert({ ...incomeData, user_id: getUserId() })
    .select()
    .single();

export const deleteIncomeItemApi = async (incomeId: number) => {
  const { data, error } = await supabase.from("incomes").delete().match({ user_id: getUserId(), id: incomeId }).select("created_at, id, name, category, date, amount, account").single();
  return { data, error };
};

export const updateIncomeItemApi = ({ incomeId, incomeData }: { incomeId: number; incomeData: IncomeItemData }) =>
  supabase
    .from("incomes")
    .update({ ...incomeData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: incomeId })
    .select("id, name, category, date, amount, account, created_at, updated_at")
    .single();
