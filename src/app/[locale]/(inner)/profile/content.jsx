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
import { createPortal } from "react-dom";
import { clearProfile, updateProfileThunk } from "@/store/profileSlice";
import { logoutUserThunk } from "@/store/authSlice";

export default function ProfileContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const profileFields = useSelector(selectProfileFields);

  const handleSaveProfile = (profileData) => dispatch(updateProfileThunk(profileData));

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
    <Button type="primary" danger loading={isLogoutLoading} className="ml-auto !flex items-center gap-2" onClick={handleLogout}>
      <SvgLogout className="h-4 w-4" />
      {t("buttons.logout")}
    </Button>
  );

  return (
    <>
      {createPortal(headerActions, document.getElementById("layout-header"))}
      <PropValueList items={datesList} className="flex flex-wrap justify-between gap-x-6 gap-y-1" />
      <DefaultForm fields={profileFields} onSaveForm={handleSaveProfile} />
    </>
  );
}