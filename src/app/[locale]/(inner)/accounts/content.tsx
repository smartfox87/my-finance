"use client";

import { AddNewAccount } from "@/components/accounts/AddNewAccount";
import { TransferBetweenAccounts } from "@/components/accounts/TransferBetweenAccounts";
import { AccountDetail } from "@/components/accounts/AccountDetail";
import { AccountsList } from "@/components/accounts/page/AccountsList";
import { AccountsPageActions } from "@/components/accounts/page/AccountsPageActions";

export default function AccountsContent() {
  return (
    <>
      <AccountsPageActions />
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="container-edge container sticky top-16 z-20 -my-4 grid grid-cols-2 gap-4 bg-white py-4 dark:bg-dark">
          <AddNewAccount />
          <TransferBetweenAccounts />
        </div>
        <AccountsList />
        <AccountDetail />
      </div>
    </>
  );
}
