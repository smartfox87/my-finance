"use client";

import dynamic from "next/dynamic";

const StatisticsContent = dynamic(() => import("@/app/[locale]/(inner)/statistics/content"));

export default function StatisticsModule() {
  return <StatisticsContent />;
}
