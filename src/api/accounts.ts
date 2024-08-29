import { apiClient } from "@/lib/api-client";
import { getUserId } from "@/helpers/localStorage";
import { deleteAccountTypeApi } from "@/api/references";
import { getCurrentDate } from "@/helpers/date";
import { AccountItemBalance } from "@/types/accounts";

export const createInitialAccountsApi = () =>
  apiClient
    .from("accounts")
    .insert([1, 2, 3, 4].map((account_type_id) => ({ account_type_id, user_id: getUserId() })))
    .select("id, account_type_id, balance, updated_at");

export const getAccountsListApi = () => apiClient.from("accounts").select("id, account_type_id, balance, updated_at").eq("user_id", getUserId()).order("id");

export const getAccountItemApi = (accountId: string) =>
  apiClient.from("accounts").select("id, account_type_id, balance, created_at, updated_at").match({ user_id: getUserId(), id: accountId }).single();

export const createAccountItemApi = (accountData: AccountItemBalance) =>
  apiClient
    .from("accounts")
    .insert({ ...accountData, user_id: getUserId() })
    .select()
    .single();

export const deleteAccountItemApi = async (accountId: number) => {
  const { data, error } = await apiClient.from("accounts").delete().match({ user_id: getUserId(), id: accountId }).select("id, account_type_id, balance, updated_at").single();
  if (data) await deleteAccountTypeApi(data.account_type_id);
  return { data, error };
};

export const updateAccountItemApi = ({ accountId, accountData }: { accountId: number; accountData: { balance: number } }) =>
  apiClient
    .from("accounts")
    .update({ ...accountData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: accountId })
    .select("id, account_type_id, balance, updated_at")
    .single();
