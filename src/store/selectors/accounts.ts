import { createSelector } from "@reduxjs/toolkit";
import { selectCurrency } from "@/features/profile";
import { INITIAL_ACCOUNT_FIELDS, INITIAL_ACCOUNT_TRANSFER_FIELDS } from "@/constants/accounts";
import { selectAccountTypesObject } from "@/store/selectors/references";
import { FieldIds } from "@/features/fields";
import type { LazyLoadedSlices } from "@/types/store";
import type { AccountItem, AccountItemField, AccountTransferField, ProcessedAccountItem } from "@/types/accounts";

export const selectAccounts = ({ accounts }: LazyLoadedSlices): AccountItem[] | null => accounts?.accountsList || null;

export const selectAccountsList = createSelector([selectAccounts, selectAccountTypesObject], (accounts, accountTypesObject): ProcessedAccountItem[] | null =>
  accounts && accountTypesObject
    ? accounts
        .filter(({ account_type_id }) => accountTypesObject?.[account_type_id])
        .map(({ id, account_type_id, balance, updated_at }): ProcessedAccountItem => {
          const { name, user_id } = accountTypesObject[account_type_id];
          return { id, name, updated_at, balance, disabled: !user_id };
        })
    : null,
);

export const selectAccountsBalance = createSelector([selectAccountsList], (accountsList): number => accountsList?.reduce((acc, { balance }) => acc + balance, 0) || 0);

export const selectAccountsObject = createSelector([selectAccountsList], (accountsList): Record<string, string> | null =>
  accountsList ? Object.assign({}, ...accountsList.map(({ id, name }) => ({ [id]: name }))) : null,
);

export const selectAccountItem = createSelector([({ accounts }) => accounts?.accountItem, selectAccountTypesObject], (accountItem, accountTypesObject): ProcessedAccountItem | null => {
  if (!accountItem || !accountTypesObject) return null;
  const { id, account_type_id, balance, updated_at } = accountItem;
  const { name, user_id } = accountTypesObject[account_type_id];
  return { id, name, updated_at, balance, disabled: !user_id };
});

export const selectAccountFields = createSelector([selectCurrency, selectAccountItem], (currency, accountItem): AccountItemField[] =>
  INITIAL_ACCOUNT_FIELDS.map((field): AccountItemField => {
    if (field.id === FieldIds.BALANCE) return { ...field, label_suffix: currency, focus: true, value: accountItem?.[field.id] ?? field.value };
    else return { ...field, disabled: !!accountItem?.disabled, value: accountItem?.[field.id] ?? field.value };
  }),
);

export const selectAccountTransferFields = createSelector([selectCurrency, selectAccountsList], (currency, accountList): AccountTransferField[] =>
  INITIAL_ACCOUNT_TRANSFER_FIELDS.map((field): AccountTransferField => {
    if (field.id === FieldIds.AMOUNT) return { ...field, label_suffix: currency };
    else return { ...field, options: accountList?.map(({ id, name }) => ({ value: id, label: name })) ?? field.options };
  }),
);
