import { apiClient } from "@/lib/api-client";
import { getLanguage, getUserId } from "@/utils/local-storage";
import { AccountTypeData, IncomeCategoryData } from "@/types/references";

export const getCostCategoriesApi = () =>
  apiClient.from("cost_categories").select("id, cost_categories_translations(name)").filter("cost_categories_translations.lang", "eq", getLanguage()).order("sort", { ascending: false });

export const createAccountTypeApi = (accountTypeData: AccountTypeData) =>
  apiClient
    .from("account_types")
    .insert({ ...accountTypeData, user_id: getUserId() })
    .select()
    .single();

export const updateAccountTypeApi = ({ accountTypeId, accountTypeData }: { accountTypeId: number; accountTypeData: AccountTypeData }) =>
  apiClient.from("account_types").update(accountTypeData).eq("id", accountTypeId).select().single();

export const deleteAccountTypeApi = (typeId: number) => apiClient.from("account_types").delete().match({ id: typeId, user_id: getUserId() });

export const getAccountTypesApi = () =>
  apiClient
    .from("account_types")
    .select("id, user_id, general_name, account_types_translations(name)")
    .filter("account_types_translations.lang", "eq", getLanguage())
    .or(`user_id.is.null, user_id.eq.${getUserId()}`)
    .order("id");

export const createIncomeCategoryApi = (incomeCategoryData: IncomeCategoryData) =>
  apiClient
    .from("income_categories")
    .insert({ ...incomeCategoryData, user_id: getUserId() })
    .select()
    .single();

export const updateIncomeCategoryApi = ({ incomeCategoryId, incomeCategoryData }: { incomeCategoryId: number; incomeCategoryData: IncomeCategoryData }) =>
  apiClient.from("income_categories").update(incomeCategoryData).eq("id", incomeCategoryId).select().single();

export const getIncomeCategoriesApi = () =>
  apiClient
    .from("income_categories")
    .select("id, user_id, general_name, income_categories_translations(name)")
    .filter("income_categories_translations.lang", "eq", getLanguage())
    .or(`user_id.is.null, user_id.eq.${getUserId()}`)
    .order("id");

export const deleteIncomeCategoryApi = (typeId: number) => apiClient.from("income_categories").delete().match({ id: typeId, user_id: getUserId() });

export const getCurrenciesApi = () => apiClient.from("currencies").select("id, name, code, symbol").order("code");
