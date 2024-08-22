import { InnerHeaderActionsPortal } from "@/components/layout/inner/InnerHeaderActionsPortal";
import { Button } from "antd";
import SvgLogout from "@/assets/sprite/logout.svg";
import { useState } from "react";
import { logoutUserThunk } from "@/store/slices/authSlice";
import { clearProfile } from "@/store/slices/profileSlice";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/redux";

export const ProfilePageActions = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setIsLogoutLoading(true);
    await Promise.all([dispatch(logoutUserThunk()), dispatch(clearProfile())]);
    setIsLogoutLoading(false);
  };

  const headerActions = (
    <Button type="primary" danger loading={isLogoutLoading} data-cy="logout-btn" className="ml-auto !flex items-center gap-2" onClick={handleLogout}>
      <SvgLogout className="h-4 w-4" />
      {t("buttons.logout")}
    </Button>
  );

  return <InnerHeaderActionsPortal>{headerActions}</InnerHeaderActionsPortal>;
};
