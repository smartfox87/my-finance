import { supabaseClient } from "@/api/supabaseClient";
import { getLanguage, getUserId } from "@/helpers/localStorage";
import { AccountTypeData, IncomeCategoryData } from "@/types/references";

export const getCostCategoriesApi = () =>
  supabaseClient.from("cost_categories").select("id, cost_categories_translations(name)").filter("cost_categories_translations.lang", "eq", getLanguage()).order("sort", { ascending: false });

export const createAccountTypeApi = (accountTypeData: AccountTypeData) =>
  supabaseClient
    .from("account_types")
    .insert({ ...accountTypeData, user_id: getUserId() })
    .select()
    .single();

export const updateAccountTypeApi = ({ accountTypeId, accountTypeData }: { accountTypeId: number; accountTypeData: AccountTypeData }) =>
  supabaseClient.from("account_types").update(accountTypeData).eq("id", accountTypeId).select().single();

export const deleteAccountTypeApi = (typeId: number) => supabaseClient.from("account_types").delete().match({ id: typeId, user_id: getUserId() });

export const getAccountTypesApi = () =>
  supabaseClient
    .from("account_types")
    .select("id, user_id, general_name, account_types_translations(name)")
    .filter("account_types_translations.lang", "eq", getLanguage())
    .or(`user_id.is.null, user_id.eq.${getUserId()}`)
    .order("id");

export const createIncomeCategoryApi = (incomeCategoryData: IncomeCategoryData) =>
  supabaseClient
    .from("income_categories")
    .insert({ ...incomeCategoryData, user_id: getUserId() })
    .select()
    .single();

export const updateIncomeCategoryApi = ({ incomeCategoryId, incomeCategoryData }: { incomeCategoryId: number; incomeCategoryData: IncomeCategoryData }) =>
  supabaseClient.from("income_categories").update(incomeCategoryData).eq("id", incomeCategoryId).select().single();

export const getIncomeCategoriesApi = () =>
  supabaseClient
    .from("income_categories")
    .select("id, user_id, general_name, income_categories_translations(name)")
    .filter("income_categories_translations.lang", "eq", getLanguage())
    .or(`user_id.is.null, user_id.eq.${getUserId()}`)
    .order("id");

export const deleteIncomeCategoryApi = (typeId: number) => supabaseClient.from("income_categories").delete().match({ id: typeId, user_id: getUserId() });

export const getCurrenciesApi = () => supabaseClient.from("currencies").select("id, name, code, symbol").order("code");
