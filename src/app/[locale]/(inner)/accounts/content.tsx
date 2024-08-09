"use client";

import { selectCurrency } from "@/store/selectors/profile";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/loading";
import { selectAccountsList } from "@/store/selectors/accounts";
import { Suspense, useCallback } from "react";
import { getAccountsListThunk } from "@/store/slices/accountsSlice";
import { Preloader } from "@/components/Layout/Preloader";
import { AddNewAccount } from "@/components/Accounts/New/AddNewAccount";
import { TransferBetweenAccounts } from "@/components/Accounts/Detail/TransferBetweenAccounts";
import { AccountListItem } from "@/components/Accounts/List/AccountListItem";
import { AccountDetail } from "@/components/Accounts/Detail/AccountDetail";
import formatPrice from "@/helpers/formatPrice";
import { getAccountTypesThunk } from "@/store/slices/referencesSlice";
import { InnerHeaderActionsPortal } from "@/components/Layout/Inner/InnerHeaderActionsPortal";
import { useAppDispatch } from "@/hooks/redux";

export default function AccountsContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useLoading(false);
  const accountsList = useSelector(selectAccountsList);
  const handleGetData = useCallback(async ({ types = false } = {}) => {
    setIsLoading(true);
    if (types) await dispatch(getAccountTypesThunk());
    await dispatch(getAccountsListThunk());
    setIsLoading(false);
  }, []);

  const totalBalance = accountsList?.reduce((acc, { balance }) => acc + balance, 0);
  const currency = useSelector(selectCurrency);
  const headerActions = (
    <div className="ml-auto font-black lg:text-lg">
      <span className="mr-1">{t("common.total")}: </span>
      {formatPrice(totalBalance)}
      {currency}
    </div>
  );

  return (
    <Preloader isLoading={isLoading}>
      <InnerHeaderActionsPortal>{headerActions}</InnerHeaderActionsPortal>
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewAccount onSave={handleGetData} />
            <TransferBetweenAccounts onSave={handleGetData} />
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {accountsList?.map((account) => (
            <li key={account.id}>
              <AccountListItem {...account} />
            </li>
          ))}
        </ul>
        <Suspense fallback={<div />}>
          <AccountDetail onSave={handleGetData} />
        </Suspense>
      </div>
    </Preloader>
  );
}