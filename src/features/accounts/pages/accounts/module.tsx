"use client";

import dynamic from "next/dynamic";

const AccountsContent = dynamic(() => import("./content"));

export function AccountsModule() {
  return <AccountsContent />;
}
