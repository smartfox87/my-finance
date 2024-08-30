"use client";

import { AddNewAccount } from "../../components/add-new-account";
import { TransferBetweenAccounts } from "../../components/transfer-between-accounts";
import { AccountDetail } from "../../components/account-detail";
import { AccountsList } from "../../components/accounts-list";
import { AccountsHeaderAside } from "../../components/accounts-header-aside";

export default function AccountsContent() {
  return (
    <>
      <AccountsHeaderAside />
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
