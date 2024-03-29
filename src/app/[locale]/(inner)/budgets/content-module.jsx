"use client";

import dynamic from "next/dynamic";

const BudgetsContent = dynamic(() => import("@/app/[locale]/(inner)/budgets/content"));

export default function BudgetsModule() {
  return <BudgetsContent />;
}
