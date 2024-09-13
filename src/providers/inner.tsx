"use client";

import { AntdProvider } from "@/providers/items/antd";
import { ReferencesLoading } from "@/providers/items/references";
import { AccountsLoading } from "./items/accounts";
import { ProfileLoading } from "@/features/profile";
import { AuthInitialization } from "@/providers/items/auth";
import type { ReactNode } from "react";

export function InnerPagesProvider({ children }: { children: ReactNode }) {
  return (
    <AntdProvider>
      <AuthInitialization>
        <ReferencesLoading>
          <AccountsLoading>
            <ProfileLoading>{children}</ProfileLoading>
          </AccountsLoading>
        </ReferencesLoading>
      </AuthInitialization>
    </AntdProvider>
  );
}
