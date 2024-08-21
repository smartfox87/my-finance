import { supabaseClient } from "@/api/supabaseClient";
import { getUserId } from "@/helpers/localStorage";
import { getCurrentDate, getFromPeriodDatesForApi, getToPeriodDatesForApi } from "@/helpers/date";
import type { BudgetItemData } from "@/types/budgets";
import { FilterPeriodStateItem } from "@/types/filter";
import { FieldIds } from "@/types/field";

export const getBudgetsListApi = (filter: FilterPeriodStateItem) =>
  supabaseClient
    .from("budgets")
    .select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)")
    .eq("user_id", getUserId())
    .rangeGte("period", getFromPeriodDatesForApi(filter[FieldIds.PERIOD]))
    .rangeLte("period", getToPeriodDatesForApi(filter[FieldIds.PERIOD]));

export const getBudgetItemApi = (budgetId: string) =>
  supabaseClient.from("budgets").select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)").match({ user_id: getUserId(), id: budgetId }).single();

export const createBudgetItemApi = async ({ name, amount, period, categories, accounts }: BudgetItemData) => {
  const { data, error } = await supabaseClient.from("budgets").insert({ name, amount, period, user_id: getUserId() }).select().single();
  await supabaseClient.from("budgets_cost_categories").insert(categories.map((cost_category_id) => ({ cost_category_id, budget_id: data.id, user_id: getUserId() })));
  await supabaseClient.from("budgets_accounts").insert(accounts.map((account_id) => ({ account_id, budget_id: data.id, user_id: getUserId() })));
  return { data, error };
};

export const deleteBudgetItemApi = (budgetId: number) =>
  supabaseClient.from("budgets").delete().match({ user_id: getUserId(), id: budgetId }).select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)").single();

export const updateBudgetItemApi = async ({ budgetId, budgetData: { name, amount, period, categories, accounts } }: { budgetId: number; budgetData: BudgetItemData }) => {
  const { data, error } = await supabaseClient
    .from("budgets")
    .update({ name, amount, period, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: budgetId })
    .select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)")
    .single();
  if (!data) return { data, error };

  await supabaseClient.from("budgets_cost_categories").delete().match({ budget_id: budgetId, user_id: getUserId() });
  if (categories?.length) await supabaseClient.from("budgets_cost_categories").insert(categories.map((cost_category_id) => ({ cost_category_id, budget_id: budgetId, user_id: getUserId() })));

  await supabaseClient.from("budgets_accounts").delete().match({ budget_id: budgetId, user_id: getUserId() });
  if (accounts?.length) await supabaseClient.from("budgets_accounts").insert(accounts.map((account_id) => ({ account_id, budget_id: data.id, user_id: getUserId() })));
  return { data, error };
};
