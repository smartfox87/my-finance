import { createSelector } from "@reduxjs/toolkit";
import { selectCurrency } from "@/store/selectors/profile";
import { INITIAL_ACCOUNT_FIELDS } from "@/constants/accounts";
import { selectAccountTypesObject } from "@/store/selectors/references";
import { LazyLoadedSlices } from "@/store";
import { AccountItem } from "@/types/accounts";

export const selectAccounts = ({ accounts }: LazyLoadedSlices): AccountItem[] | null => accounts?.accountsList || null;

export const selectAccountsList = createSelector(
  [selectAccounts, selectAccountTypesObject],
  (accounts, accountTypesObject) =>
    accounts
      ?.filter(({ account_type_id }) => accountTypesObject?.[account_type_id])
      .map(({ id, account_type_id, balance, updated_at }) => {
        const { name, general_name, user_id } = accountTypesObject[account_type_id];
        return { id, name: name || general_name, updated_at, balance, disabled: !user_id };
      }) || null,
);

export const selectAccountsObject = createSelector([selectAccountsList], (accountsList) => accountsList?.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {})) || null;

export const selectAccountItem = createSelector([({ accounts }) => accounts?.accountItem, selectAccountTypesObject], (accountItem, accountTypesObject) => {
  if (!accountItem || !accountTypesObject) return null;
  const { id, account_type_id, balance, created_at, updated_at } = accountItem;
  const { name, general_name, user_id } = accountTypesObject[account_type_id];
  return { id, name: name || general_name, updated_at, balance, created_at, disabled: !user_id };
});

export const selectAccountFields = createSelector([selectCurrency], (currency) =>
  INITIAL_ACCOUNT_FIELDS.map((field) => {
    if (field.id === "balance") return { ...field, label_suffix: currency };
    else return field;
  }),
);
