"use client";

import { UIProvider } from "@/features/ui-provider";
import { ReferencesLoading } from "@/providers/items/references";
import { AccountsLoading } from "./items/accounts";
import { ProfileLoading } from "@/features/profile";
import { AuthInitialization } from "@/providers/items/auth";
import type { ReactNode } from "react";

export function InnerPagesProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <UIProvider>
        <AuthInitialization>
          <ReferencesLoading>
            <AccountsLoading>
              <ProfileLoading>{children}</ProfileLoading>
            </AccountsLoading>
          </ReferencesLoading>
        </AuthInitialization>
      </UIProvider>
    </>
  );
}
