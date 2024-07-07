import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import { createAccountItemApi, getAccountsListApi, updateAccountItemApi, deleteAccountItemApi, getAccountItemApi, createInitialAccountsApi } from "@/api/accounts";
import { handleRejected } from "@/helpers/processExtraReducersCases";
import { createAccountTypeApi, updateAccountTypeApi } from "@/api/references";
import { RootState, rootReducer } from "@/store";
import type { AccountItem, AccountItemData, AccountItemBalanceData, AccountsSliceState } from "@/types/accounts";
import type { AccountTypeData } from "@/types/references";

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
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.accountsList = payload;
        },
      },
    ),
    createAccountItemThunk: create.asyncThunk<AccountItem, AccountItemData, { rejectValue: string }>(
      async (accountData, { rejectWithValue }): Promise<AccountItem> => {
        const typeData: AccountTypeData = { general_name: accountData.name };
        const { data: newTypeData, error: newTypeError } = await createAccountTypeApi(typeData);
        if (newTypeError) throw rejectWithValue(newTypeError.message);
        const newAccountData = { account_type_id: newTypeData.id, balance: accountData.balance };
        const { data, error } = await createAccountItemApi(newAccountData);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
      },
    ),
    getAccountItemThunk: create.asyncThunk<AccountItem, string, { rejectValue: string }>(
      async (accountId, { rejectWithValue }) => {
        const { data, error } = await getAccountItemApi(accountId);
        if (error) throw rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.accountItem = payload;
        },
      },
    ),
    updateAccountItemThunk: create.asyncThunk<AccountItem, { accountId: number; accountData: AccountItemData }, { rejectValue: string }>(
      async ({ accountId, accountData: { name, balance } }, thunkApi) => {
        const { accountItem } = (thunkApi.getState() as RootState).accounts as AccountsSliceState;
        if (accountItem && accountItem.name !== name) {
          const { error } = await updateAccountTypeApi({ accountTypeId: accountItem.account_type_id, accountTypeData: { general_name: name } });
          if (error) throw thunkApi.rejectWithValue(error.message);
        }
        const { data, error } = await updateAccountItemApi({ accountId, accountData: { balance } });
        if (error) throw thunkApi.rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          if (Array.isArray(state.accountsList)) state.accountsList = state.accountsList.map((account) => (account.id === payload.id ? payload : account));
        },
      },
    ),
    updateAccountBalanceThunk: create.asyncThunk<AccountItem, AccountItemBalanceData, { rejectValue: string }>(
      async ({ accountId, increase = 0, decrease = 0 }, thunkApi) => {
        const accountItem = ((thunkApi.getState() as RootState).accounts as AccountsSliceState).accountsList?.find(({ id }) => id === accountId);
        if (!accountItem) throw thunkApi.rejectWithValue("Account not found");
        const { data, error } = await updateAccountItemApi({ accountId, accountData: { balance: accountItem.balance + increase - decrease } });
        if (error) throw thunkApi.rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          if (Array.isArray(state.accountsList)) state.accountsList = state.accountsList.map((account) => (account.id === payload.id ? payload : account));
        },
      },
    ),
    transferAccountsBalanceThunk: create.asyncThunk<void, { from: number; to: number; amount: number }, { rejectValue: string }>(
      async ({ from, to, amount }, thunkApi) => {
        const { accountsList } = (thunkApi.getState() as RootState).accounts as AccountsSliceState;
        const fromAccount = accountsList?.find(({ id }) => id === from) as AccountItem;
        const toAccount = accountsList?.find(({ id }) => id === to) as AccountItem;
        const { error: fromError } = await updateAccountItemApi({ accountId: from, accountData: { balance: fromAccount.balance - amount } });
        if (fromError) throw thunkApi.rejectWithValue(fromError.message);
        const { error: toError } = await updateAccountItemApi({ accountId: to, accountData: { balance: toAccount.balance + amount } });
        if (toError) throw thunkApi.rejectWithValue(toError.message);
      },
      {
        rejected: handleRejected,
      },
    ),
    deleteAccountItemThunk: create.asyncThunk<AccountItem | null, number, { rejectValue: string }>(
      async (accountId = 0, thunkApi) => {
        const { data, error } = await deleteAccountItemApi(accountId);
        if (error) throw thunkApi.rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state) => {
          state.accountItem = null;
        },
      },
    ),
    setAccountItem: create.reducer<AccountItem>((state, { payload }) => {
      state.accountItem = payload;
    }),
  }),
});

declare module "@/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof accountsSlice> {}
}

const injectedReducers = rootReducer.inject(accountsSlice);

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
