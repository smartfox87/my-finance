"use client";

import dynamic from "next/dynamic";

const ProfileContent = dynamic(() => import("@/app/[locale]/(inner)/profile/content"));

export default function ProfileModule() {
  return <ProfileContent />;
}
