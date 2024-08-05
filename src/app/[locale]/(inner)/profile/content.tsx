"use client";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectProfile, selectProfileFields } from "@/store/selectors/profile";
import { getFullDate } from "@/helpers/date";
import { useState } from "react";
import { Button } from "antd";
import { PropValueList } from "@/components/Common/PropValueList";
import { DefaultForm } from "@/components/Form/DefaultForm";
import SvgLogout from "@/assets/sprite/logout.svg";
import { clearProfile, getProfileThunk, updateProfileThunk } from "@/store/profileSlice";
import { logoutUserThunk } from "@/store/authSlice";
import { showNotification } from "@/helpers/modals.js";
import { InnerHeaderActionsPortal } from "@/components/Layout/Inner/InnerHeaderActionsPortal";
import { useAppDispatch } from "@/hooks/redux";
import { showCommonError } from "@/helpers/errors";
import { FormValues } from "@/types/form";
import { isProfileData } from "@/predicates/profile";

export default function ProfileContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profile = useSelector(selectProfile);
  const profileFields = useSelector(selectProfileFields);

  const handleSaveProfile = async (profileData: FormValues): Promise<void> => {
    try {
      if (!(profile && isProfileData(profileData))) return;
      await dispatch(updateProfileThunk(profileData)).unwrap();
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.profile.update") });
    } catch (error) {
      showCommonError();
    }
  };

  const datesList = [
    { prop: t("common.created_at"), value: getFullDate(profile?.created_at, "YYYY MMMM DD, HH:MM") },
    { prop: t("common.updated_at"), value: getFullDate(profile?.updated_at, "YYYY MMMM DD, HH:MM") },
  ];

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const handleLogout = async () => {
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

  return (
    <>
      <InnerHeaderActionsPortal>{headerActions}</InnerHeaderActionsPortal>
      <PropValueList items={datesList} className="flex flex-wrap justify-between gap-x-6 gap-y-1" />
      <DefaultForm fields={profileFields} data-cy="edit-profile-form" onSaveForm={handleSaveProfile} />
    </>
  );
}
