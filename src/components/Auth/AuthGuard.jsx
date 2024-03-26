import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";
import { useTranslation } from "react-i18next";
import { DemoUserAuth } from "@/components/Auth/DemoUserAuth.jsx";
import { useMemo } from "react";

export const AuthGuard = ({ children }) => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();

  const authRequirement = useMemo(
    () => (
      <div className="container flex grow flex-col items-center justify-center gap-8">
        <p className="max-w-xl text-center text-2xl font-black">{t("notifications.auth_requirement")}</p>
        <DemoUserAuth />
      </div>
    ),
    [t],
  );

  return <>{user ? children : authRequirement}</>;
};
