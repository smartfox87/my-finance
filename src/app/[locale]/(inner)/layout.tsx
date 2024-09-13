import { InnerPagesProvider } from "@/providers/inner";
import { Layout } from "@/features/main-layout";
import type { ReactNode } from "react";

export default function InnerLayout({ children }: { children: ReactNode }) {
  return (
    <InnerPagesProvider>
      <Layout>{children}</Layout>
    </InnerPagesProvider>
  );
}
