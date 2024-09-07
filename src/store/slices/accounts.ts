import { createAccountItemApi, getAccountsListApi, updateAccountItemApi, deleteAccountItemApi, getAccountItemApi, createInitialAccountsApi } from "@/api/accounts";
import { handleRejectedReducerAction } from "@/utils/errors";
import { createAccountTypeApi, updateAccountTypeApi } from "@/api/references";
import { rootReducer } from "@/store";
import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import type { AccountTypeData } from "@/types/references";
import type { RootState } from "@/types/store";
import type { AccountItem, AccountItemUpdateData, AccountItemBalanceData, AccountsSliceState, AccountItemCreateData } from "@/types/accounts";
import { getAccountTypesThunk } from "@/store/slices/references";
import { showNotification } from "@/utils/modals";
import { i18nRef } from "@/i18n";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: AccountsSliceState = {
  accountsList: null,
  accountItem: null,
};

export const accountsSlice = createAppSlice({
  name: "accounts",
  initialState,
  reducers: (create) => ({
    getAccountsListThunk: create.asyncThunk<AccountItem[], void, { rejectValue: string }>(
      async (_, { rejectWithValue }): Promise<AccountItem[]> => {
        const { data, error } = await getAccountsListApi();
        if (error) throw rejectWithValue(error.message);
        if (!data?.length) {
          const { data, error } = await createInitialAccountsApi();
          if (error) throw rejectWithValue(error.message);
          return data;
        }
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.accountsList = payload;
        },
      },
    ),
    createAccountItemThunk: create.asyncThunk<AccountItem, AccountItemCreateData, { rejectValue: string }>(
      async (accountData, { rejectWithValue, dispatch }): Promise<AccountItem> => {
        const typeData: AccountTypeData = { general_name: accountData.name };
        const { data: newTypeData, error: newTypeError } = await createAccountTypeApi(typeData);
        if (newTypeError) throw rejectWithValue(newTypeError.message);
        const newAccountData = { account_type_id: newTypeData.id, balance: accountData.balance };
        const { data, error } = await createAccountItemApi(newAccountData);
        if (error) throw rejectWithValue(error.message);
        await dispatch(getAccountsListThunk()).unwrap();
        await dispatch(getAccountTypesThunk()).unwrap();
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: () => {
          showNotification({ title: i18nRef.t?.("notifications.account.create") });
        },
      },
    ),
    getAccountItemThunk: create.asyncThunk<AccountItem, string, { rejectValue: string }>(
      async (accountId, { rejectWithValue }) => {
        const { data, error } = await getAccountItemApi(accountId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.accountItem = payload;
        },
      },
    ),
    updateAccountItemThunk: create.asyncThunk<AccountItem, { accountId: number; accountData: AccountItemUpdateData }, { rejectValue: string }>(
      async ({ accountId, accountData: { name, balance } }, { rejectWithValue, getState, dispatch }) => {
        const { accountItem } = (getState() as RootState).accounts as AccountsSliceState;
        if (accountItem && name && accountItem.name !== name) {
          const { error } = await updateAccountTypeApi({ accountTypeId: accountItem.account_type_id, accountTypeData: { general_name: name } });
          if (error) throw rejectWithValue(error.message);
        }
        const { data, error } = await updateAccountItemApi({ accountId, accountData: { balance } });
        if (error) throw rejectWithValue(error.message);
        await dispatch(getAccountsListThunk()).unwrap();
        await dispatch(getAccountTypesThunk()).unwrap();
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: () => {
          showNotification({ title: i18nRef.t?.("notifications.account.update") });
        },
      },
    ),
    updateAccountBalanceThunk: create.asyncThunk<AccountItem, AccountItemBalanceData, { rejectValue: string }>(
      async ({ accountId, increase = 0, decrease = 0 }, { rejectWithValue, getState, dispatch }) => {
        const accountItem = ((getState() as RootState).accounts as AccountsSliceState).accountsList?.find(({ id }) => id === accountId);
        if (!accountItem) throw rejectWithValue("Account not found");
        const { data, error } = await updateAccountItemApi({ accountId, accountData: { balance: accountItem.balance + increase - decrease } });
        if (error) throw rejectWithValue(error.message);
        await dispatch(getAccountsListThunk()).unwrap();
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: () => {
          showNotification({ title: i18nRef.t?.("notifications.account.update") });
        },
      },
    ),
    transferAccountsBalanceThunk: create.asyncThunk<void, { from: number; to: number; amount: number }, { rejectValue: string }>(
      async ({ from, to, amount }, { rejectWithValue, getState, dispatch }) => {
        const { accountsList } = (getState() as RootState).accounts as AccountsSliceState;
        const fromAccount = accountsList?.find(({ id }) => id === from) as AccountItem;
        const toAccount = accountsList?.find(({ id }) => id === to) as AccountItem;
        const { error: fromError } = await updateAccountItemApi({ accountId: from, accountData: { balance: fromAccount.balance - amount } });
        if (fromError) throw rejectWithValue(fromError.message);
        const { error: toError } = await updateAccountItemApi({ accountId: to, accountData: { balance: toAccount.balance + amount } });
        if (toError) throw rejectWithValue(toError.message);
        await dispatch(getAccountsListThunk()).unwrap();
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: () => {
          showNotification({ title: i18nRef.t?.("notifications.account.money_transfer") });
        },
      },
    ),
    deleteAccountItemThunk: create.asyncThunk<AccountItem | null, number, { rejectValue: string }>(
      async (accountId = 0, { rejectWithValue, dispatch }) => {
        const { data, error } = await deleteAccountItemApi(accountId);
        if (error) throw rejectWithValue(error.message);
        await dispatch(getAccountsListThunk()).unwrap();
        await dispatch(getAccountTypesThunk()).unwrap();
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state) => {
          state.accountItem = null;
          showNotification({ title: i18nRef.t?.("notifications.account.delete") });
        },
      },
    ),
    setAccountItem: create.reducer<AccountItem | null>((state, { payload }) => {
      state.accountItem = payload;
    }),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof accountsSlice> {}
}

rootReducer.inject(accountsSlice);

export const {
  getAccountsListThunk,
  setAccountItem,
  createAccountItemThunk,
  getAccountItemThunk,
  updateAccountItemThunk,
  deleteAccountItemThunk,
  transferAccountsBalanceThunk,
  updateAccountBalanceThunk,
} = accountsSlice.actions;
