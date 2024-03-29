"use client";

import dynamic from "next/dynamic";

const ExpensesContent = dynamic(() => import("@/app/[locale]/(inner)/expenses/content"));

export default function ExpensesModule() {
  return <ExpensesContent />;
}
