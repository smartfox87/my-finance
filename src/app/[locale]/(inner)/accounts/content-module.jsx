"use client";

import dynamic from "next/dynamic";

const AccountsContent = dynamic(() => import("@/app/[locale]/(inner)/accounts/content.jsx"));

export default function AccountsModule() {
  return <AccountsContent />;
}
