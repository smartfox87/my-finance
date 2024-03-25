import { supabase } from "@/api/supabase.js";
import { getUserId } from "@/helpers/localStorage.js";
import { deleteAccountTypeApi } from "@/api/references.js";
import { getCurrentDate } from "@/helpers/date.js";

export const createInitialAccountsApi = () =>
  supabase
    .from("accounts")
    .insert([1, 2, 3, 4].map((account_type_id) => ({ account_type_id, user_id: getUserId() })))
    .select("id, account_type_id, balance, updated_at");

export const getAccountsListApi = () => supabase.from("accounts").select("id, account_type_id, balance, updated_at").eq("user_id", getUserId()).order("id");

export const getAccountItemApi = (accountId) => supabase.from("accounts").select("id, account_type_id, balance, created_at, updated_at").match({ user_id: getUserId(), id: accountId }).single();

export const createAccountItemApi = (accountData) =>
  supabase
    .from("accounts")
    .insert({ ...accountData, user_id: getUserId() })
    .select()
    .single();

export const deleteAccountItemApi = async (accountId) => {
  const { data, error } = await supabase.from("accounts").delete().match({ user_id: getUserId(), id: accountId }).select("account_type_id").single();
  await deleteAccountTypeApi(data.account_type_id);
  return { data, error };
};

export const updateAccountItemApi = ({ accountId, accountData }) =>
  supabase
    .from("accounts")
    .update({ ...accountData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: accountId })
    .select("id, account_type_id, balance, updated_at")
    .single();
