import { ContactPageProvider } from "@/providers/contact";
import { Layout } from "@/features/main-layout";
import type { ReactNode } from "react";

export default function InnerLayout({ children }: { children: ReactNode }) {
  return (
    <ContactPageProvider>
      <Layout>{children}</Layout>
    </ContactPageProvider>
  );
}
