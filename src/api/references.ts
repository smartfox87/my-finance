import { supabase } from "@/api/supabase.js";
import { getLanguage, getUserId } from "@/helpers/localStorage.js";
import { AccountTypeData, IncomeCategoryData } from "@/types/references";

export const getCostCategoriesApi = () =>
  supabase.from("cost_categories").select("id, cost_categories_translations(name)").filter("cost_categories_translations.lang", "eq", getLanguage()).order("sort", { ascending: false });

export const createAccountTypeApi = (accountTypeData: AccountTypeData) =>
  supabase
    .from("account_types")
    .insert({ ...accountTypeData, user_id: getUserId() })
    .select()
    .single();

export const updateAccountTypeApi = ({ accountTypeId, accountTypeData }: { accountTypeId: number; accountTypeData: AccountTypeData }) =>
  supabase.from("account_types").update(accountTypeData).eq("id", accountTypeId).select().single();

export const deleteAccountTypeApi = (typeId: number) => supabase.from("account_types").delete().match({ id: typeId, user_id: getUserId() });

export const getAccountTypesApi = () =>
  supabase
    .from("account_types")
    .select("id, user_id, general_name, account_types_translations(name)")
    .filter("account_types_translations.lang", "eq", getLanguage())
    .or(`user_id.is.null, user_id.eq.${getUserId()}`)
    .order("id");

export const createIncomeCategoryApi = (incomeCategoryData: IncomeCategoryData) =>
  supabase
    .from("income_categories")
    .insert({ ...incomeCategoryData, user_id: getUserId() })
    .select()
    .single();

export const updateIncomeCategoryApi = ({ incomeCategoryId, incomeCategoryData }: { incomeCategoryId: number; incomeCategoryData: IncomeCategoryData }) =>
  supabase.from("income_categories").update(incomeCategoryData).eq("id", incomeCategoryId).select().single();

export const getIncomeCategoriesApi = () =>
  supabase
    .from("income_categories")
    .select("id, user_id, general_name, income_categories_translations(name)")
    .filter("income_categories_translations.lang", "eq", getLanguage())
    .or(`user_id.is.null, user_id.eq.${getUserId()}`)
    .order("id");

export const deleteIncomeCategoryApi = (typeId: number) => supabase.from("income_categories").delete().match({ id: typeId, user_id: getUserId() });

export const getCurrenciesApi = () => supabase.from("currencies").select("id, name, code, symbol").order("code");
