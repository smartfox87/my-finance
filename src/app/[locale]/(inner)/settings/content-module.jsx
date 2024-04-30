"use client";

import dynamic from "next/dynamic";

const SettingsContent = dynamic(() => import("@/app/[locale]/(inner)/settings/content"));

export default function SettingsModule() {
  return <SettingsContent />;
}
