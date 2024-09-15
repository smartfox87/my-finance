"use client";

import { selectUser } from "@/store/selectors/auth";
import { useTranslation } from "react-i18next";
import { DemoUserAuth } from "@/components/demo-user-auth";
import { useAppSelector } from "@/hooks/store";
import type { ComponentChildrenProps } from "@/types/common";

export const AuthGuard = ({ children }: ComponentChildrenProps) => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const authRequirement = (
    <div className="container flex grow flex-col items-center justify-center gap-8">
      <p className="max-w-xl text-center text-2xl font-black">{t("notifications.auth_requirement")}</p>
      <DemoUserAuth />
    </div>
  );

  return <>{user ? children : authRequirement}</>;
};
