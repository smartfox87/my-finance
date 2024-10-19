import { apiClient } from "@/libs/api-client";
import { getUserId } from "@/utils/local-storage";
import { getFromPeriodDatesForApi, getToPeriodDatesForApi } from "@/utils/date";
import { getCurrentISODate } from "@/utils/get-current-iso-date";
import { FieldIds } from "@/types/field";
import type { BudgetItemData } from "../types";
import type { FilterPeriodStateItem } from "@/types/filter";

export const getBudgetsListApi = (filter: FilterPeriodStateItem) =>
  apiClient
    .from("budgets")
    .select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)")
    .eq("user_id", getUserId())
    .rangeGte("period", getFromPeriodDatesForApi(filter[FieldIds.PERIOD]))
    .rangeLte("period", getToPeriodDatesForApi(filter[FieldIds.PERIOD]));

export const getBudgetItemApi = (budgetId: string) =>
  apiClient.from("budgets").select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)").match({ user_id: getUserId(), id: budgetId }).single();

export const createBudgetItemApi = async ({ name, amount, period, categories, accounts }: BudgetItemData) => {
  const { data, error } = await apiClient.from("budgets").insert({ name, amount, period, user_id: getUserId() }).select().single();
  await apiClient.from("budgets_cost_categories").insert(categories.map((cost_category_id) => ({ cost_category_id, budget_id: data.id, user_id: getUserId() })));
  await apiClient.from("budgets_accounts").insert(accounts.map((account_id) => ({ account_id, budget_id: data.id, user_id: getUserId() })));
  return { data, error };
};

export const deleteBudgetItemApi = (budgetId: number) =>
  apiClient.from("budgets").delete().match({ user_id: getUserId(), id: budgetId }).select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)").single();

export const updateBudgetItemApi = async ({ budgetId, budgetData: { name, amount, period, categories, accounts } }: { budgetId: number; budgetData: BudgetItemData }) => {
  const { data, error } = await apiClient
    .from("budgets")
    .update({ name, amount, period, updated_at: getCurrentISODate() })
    .match({ user_id: getUserId(), id: budgetId })
    .select("created_at, id, name, amount, period, accounts(id), categories:cost_categories(id)")
    .single();
  if (!data) return { data, error };

  await apiClient.from("budgets_cost_categories").delete().match({ budget_id: budgetId, user_id: getUserId() });
  if (categories?.length) await apiClient.from("budgets_cost_categories").insert(categories.map((cost_category_id) => ({ cost_category_id, budget_id: budgetId, user_id: getUserId() })));

  await apiClient.from("budgets_accounts").delete().match({ budget_id: budgetId, user_id: getUserId() });
  if (accounts?.length) await apiClient.from("budgets_accounts").insert(accounts.map((account_id) => ({ account_id, budget_id: data.id, user_id: getUserId() })));
  return { data, error };
};
