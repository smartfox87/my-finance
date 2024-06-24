"use client";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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

export default function ProfileContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const profileFields = useSelector(selectProfileFields);

  const handleSaveProfile = async (profileData) => {
    const { error } = await dispatch(updateProfileThunk(profileData));
    if (!error) {
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.profile.update") });
    }
  };

  const datesList = [
    { prop: t("common.created_at"), value: getFullDate(profile?.created_at, "YYYY MMMM DD, HH:MM") },
    { prop: t("common.updated_at"), value: getFullDate(profile?.updated_at, "YYYY MMMM DD, HH:MM") },
  ];

  const [isLogoutLoading, setIsLogoutLoading] = useState();
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
