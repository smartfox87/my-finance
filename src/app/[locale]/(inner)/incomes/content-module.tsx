"use client";

import dynamic from "next/dynamic";

const IncomesContent = dynamic(() => import("@/app/[locale]/(inner)/incomes/content"));

export default function IncomesModule() {
  return <IncomesContent />;
}
