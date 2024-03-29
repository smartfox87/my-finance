"use client";

import dynamic from "next/dynamic";

const AccountsContent = dynamic(() => import("@/app/[locale]/(inner)/accounts/content"));

export default function AccountsModule() {
  return <AccountsContent />;
}
