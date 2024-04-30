"use client";

import dynamic from "next/dynamic";

const ContactContent = dynamic(() => import("@/app/[locale]/(inner)/contact/content"));

export default function ContactModule() {
  return <ContactContent />;
}
