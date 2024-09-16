import { AuthPagesProvider } from "@/providers/auth";
import type { ReactNode } from "react";

export default function InnerLayout({ children }: { children: ReactNode }) {
  return <AuthPagesProvider>{children}</AuthPagesProvider>;
}
