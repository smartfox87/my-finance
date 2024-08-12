"use client";

import { useLoading } from "@/hooks/loading";
import { useCallback } from "react";
import { getAccountsListThunk } from "@/store/slices/accountsSlice";
import { Preloader } from "@/components/layout/preloader/Preloader";
import { AddNewAccount } from "@/components/accounts/AddNewAccount";
import { TransferBetweenAccounts } from "@/components/accounts/TransferBetweenAccounts";
import { AccountDetail } from "@/components/accounts/AccountDetail";
import { getAccountTypesThunk } from "@/store/slices/referencesSlice";
import { useAppDispatch } from "@/hooks/redux";
import { AccountsList } from "@/components/accounts/page/AccountsList";
import { AccountsPageActions } from "@/components/accounts/page/AccountsPageActions";

export default function AccountsContent() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useLoading(false);

  const handleGetData = useCallback(async ({ types = false } = {}): Promise<void> => {
    setIsLoading(true);
    if (types) await dispatch(getAccountTypesThunk());
    await dispatch(getAccountsListThunk());
    setIsLoading(false);
  }, []);

  return (
    <Preloader isLoading={isLoading}>
      <AccountsPageActions />
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="container-edge container sticky top-16 z-20 -my-4 grid grid-cols-2 gap-4 bg-white py-4 dark:bg-dark">
          <AddNewAccount onSave={handleGetData} />
          <TransferBetweenAccounts onSave={handleGetData} />
        </div>
        <AccountsList />
        <AccountDetail onSave={handleGetData} />
      </div>
    </Preloader>
  );
}
