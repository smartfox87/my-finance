import { supabase } from "@/api/supabase.js";
import { getUserId } from "@/helpers/localStorage.js";
import { DatesPeriod, getCurrentDate, getFromPeriodDatesForApi, getToPeriodDatesForApi } from "@/helpers/date";
import { BudgetItemData } from "@/types/budgets";

export const getBudgetsListApi = ({ period }: { period: DatesPeriod }) =>
  supabase
    .from("budgets")
    .select("created_at, id, name, amount, period, accounts:accounts(id), categories:cost_categories(id)")
    .eq("user_id", getUserId())
    .rangeGte("period", getFromPeriodDatesForApi(period))
    .rangeLte("period", getToPeriodDatesForApi(period));

export const getBudgetItemApi = (budgetId: string) =>
  supabase.from("budgets").select("id, name, amount, period, accounts:accounts(id), categories:cost_categories(id)").match({ user_id: getUserId(), id: budgetId }).single();

export const createBudgetItemApi = async ({ name, amount, period, categories, accounts }: BudgetItemData) => {
  const { data, error } = await supabase.from("budgets").insert({ name, amount, period, user_id: getUserId() }).select().single();
  await supabase.from("budgets_cost_categories").insert(categories.map((cost_category_id) => ({ cost_category_id, budget_id: data.id, user_id: getUserId() })));
  await supabase.from("budgets_accounts").insert(accounts.map((account_id) => ({ account_id, budget_id: data.id, user_id: getUserId() })));
  return { data, error };
};

export const deleteBudgetItemApi = (budgetId: number) =>
  supabase.from("budgets").delete().match({ user_id: getUserId(), id: budgetId }).select("created_at, id, name, amount, period, accounts:accounts(id), categories:cost_categories(id)").single();

export const updateBudgetItemApi = async ({ budgetId, budgetData: { name, amount, period, categories, accounts } }: { budgetId: number; budgetData: BudgetItemData }) => {
  const { data, error } = await supabase
    .from("budgets")
    .update({ name, amount, period, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: budgetId })
    .select("id, name, amount, period, accounts:accounts(id), categories:cost_categories(id)")
    .single();
  if (!data) return { data, error };

  await supabase.from("budgets_cost_categories").delete().match({ budget_id: budgetId, user_id: getUserId() });
  if (categories?.length) await supabase.from("budgets_cost_categories").insert(categories.map((cost_category_id) => ({ cost_category_id, budget_id: budgetId, user_id: getUserId() })));

  await supabase.from("budgets_accounts").delete().match({ budget_id: budgetId, user_id: getUserId() });
  if (accounts?.length) await supabase.from("budgets_accounts").insert(accounts.map((account_id) => ({ account_id, budget_id: data.id, user_id: getUserId() })));
  return { data, error };
};
