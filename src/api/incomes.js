import { supabase } from "@/api/supabase.js";
import { getUserId } from "@/helpers/localStorage.js";
import { deleteIncomeCategoryApi } from "@/api/references.js";
import { getCurrentDate } from "@/helpers/date";

export const getIncomesListApi = ({ period: [from, to] }) =>
  supabase.from("incomes").select("created_at, id, name, category, date, amount, account").or(`user_id.eq.${getUserId()}`).order("id").gte("date", from).lte("date", to);

export const getIncomeItemApi = (incomeId) =>
  supabase.from("incomes").select("id, name, category, date, amount, account, created_at, updated_at").match({ user_id: getUserId(), id: incomeId }).single();

export const createIncomeItemApi = (incomeData) =>
  supabase
    .from("incomes")
    .insert({ ...incomeData, user_id: getUserId() })
    .select()
    .single();

export const deleteIncomeItemApi = async (incomeId) => {
  const { data, error } = await supabase.from("incomes").delete().match({ user_id: getUserId(), id: incomeId }).select("category").single();
  await deleteIncomeCategoryApi(data.category);
  return { data, error };
};

export const updateIncomeItemApi = ({ incomeId, incomeData }) =>
  supabase
    .from("incomes")
    .update({ ...incomeData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: incomeId })
    .select("id, name, category, date, amount, account, created_at, updated_at")
    .single();
