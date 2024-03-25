import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createAccountItemApi, getAccountsListApi, updateAccountItemApi, deleteAccountItemApi, getAccountItemApi, createInitialAccountsApi } from "@/api/accounts.js";
import { handleRejected } from "@/helpers/processExtraReducersCases.js";
import { createAccountTypeApi, updateAccountTypeApi } from "@/api/references.js";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const accountsSlice = createAppSlice({
  name: "accounts",
  initialState: {
    accountsList: null,
    accountItem: null,
  },
  reducers: (create) => ({
    getAccountsListThunk: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const { data, error } = await getAccountsListApi();
        if (error) return rejectWithValue(error.message);
        if (!data?.length) {
          const { data, error } = await createInitialAccountsApi();
          if (error) return rejectWithValue(error.message);
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
    createAccountItemThunk: create.asyncThunk(
      async (accountData, { rejectWithValue }) => {
        const typeData = { general_name: accountData.name };
        const { data: newTypeData, error } = await createAccountTypeApi(typeData);
        if (error) return rejectWithValue(error.message);
        if (newTypeData) {
          const newAccountData = { account_type_id: newTypeData.id, balance: accountData.balance };
          const { data, error } = await createAccountItemApi(newAccountData);
          if (error) return rejectWithValue(error.message);
          return data;
        }
      },
      {
        rejected: handleRejected,
      },
    ),
    getAccountItemThunk: create.asyncThunk(
      async (accountId, { rejectWithValue }) => {
        const { data, error } = await getAccountItemApi(accountId);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.accountItem = payload;
        },
      },
    ),
    updateAccountItemThunk: create.asyncThunk(
      async ({ accountId, accountData: { name, balance } }, { rejectWithValue, getState }) => {
        const { accountItem } = getState().accounts;
        if (accountItem.name !== name) {
          const { error } = await updateAccountTypeApi({ accountTypeId: accountItem.account_type_id, accountTypeData: { general_name: name } });
          if (error) return rejectWithValue(error.message);
        }
        const { data, error } = await updateAccountItemApi({ accountId, accountData: { balance } });
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.accountsList = state.accountsList.map((account) => (account.id === payload.id ? payload : account));
        },
      },
    ),
    updateAccountBalanceThunk: create.asyncThunk(
      async ({ accountId, increase = 0, decrease = 0 }, { rejectWithValue, getState }) => {
        const accountItem = getState().accounts.accountsList.find(({ id }) => id === accountId);
        const { data, error } = await updateAccountItemApi({ accountId, accountData: { balance: accountItem.balance + increase - decrease } });
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejected,
        fulfilled: (state, { payload }) => {
          state.accountsList = state.accountsList.map((account) => (account.id === payload.id ? payload : account));
        },
      },
    ),
    transferAccountsBalanceThunk: create.asyncThunk(
      async ({ from, to, amount }, { rejectWithValue, getState }) => {
        const { accountsList } = getState().accounts;
        const fromAccount = accountsList.find((el) => el.id === from);
        const toAccount = accountsList.find((el) => el.id === to);
        const { error: fromError } = await updateAccountItemApi({ accountId: from, accountData: { balance: fromAccount.balance - amount } });
        if (fromError) return rejectWithValue(fromError.message);
        const { error: toError } = await updateAccountItemApi({ accountId: to, accountData: { balance: toAccount.balance + amount } });
        if (toError) return rejectWithValue(toError.message);
      },
      {
        rejected: handleRejected,
      },
    ),
    deleteAccountItemThunk: create.asyncThunk(
      async (accountId, { rejectWithValue }) => {
        try {
          const { data, error } = await deleteAccountItemApi(accountId);
          if (error) return rejectWithValue(error.message);
          return data;
        } catch (e) {
          return rejectWithValue(e.message);
        }
      },
      {
        rejected: handleRejected,
      },
    ),
    setAccountItem(state, { payload }) {
      state.accountItem = payload;
    },
  }),
});

export const {
  setAccountItem,
  getAccountsListThunk,
  createAccountItemThunk,
  getAccountItemThunk,
  updateAccountItemThunk,
  deleteAccountItemThunk,
  transferAccountsBalanceThunk,
  updateAccountBalanceThunk,
} = accountsSlice.actions;
