"use client";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "@/hooks/injectReducer";
import { selectProfile, selectProfileFields } from "@/store/selectors/profile";
import { getFullDate } from "@/helpers/date";
import { useState } from "react";
import { Button } from "antd";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import { PropValueList } from "@/components/Common/PropValueList";
import { DefaultForm } from "@/components/Form/DefaultForm";
import SvgLogout from "@/assets/sprite/logout.svg";

export default function ProfileContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { thunks } = useInjectReducer();
  const profile = useSelector(selectProfile);
  const profileFields = useSelector(selectProfileFields);

  const handleSaveProfile = (profileData) => dispatch(thunks.profile.updateProfileThunk(profileData));

  const datesList = [
    { prop: t("common.created_at"), value: getFullDate(profile?.created_at, "YYYY MMMM DD, HH:MM") },
    { prop: t("common.updated_at"), value: getFullDate(profile?.updated_at, "YYYY MMMM DD, HH:MM") },
  ];

  const [isLogoutLoading, setIsLogoutLoading] = useState();
  const handleLogout = async () => {
    setIsLogoutLoading(true);
    await Promise.all([dispatch(thunks.auth.logoutUserThunk()), dispatch(thunks.profile.clearProfile())]);
    setIsLogoutLoading(false);
  };

  const logoutButton = (
    <Button type="primary" danger loading={isLogoutLoading} className="!flex items-center gap-2" onClick={handleLogout}>
      <SvgLogout className="h-4 w-4" />
      {t("buttons.logout")}
    </Button>
  );

  return (
    <InnerLayout headerActions={logoutButton}>
      <PropValueList items={datesList} className="flex flex-wrap justify-between gap-x-6 gap-y-1" />
      <DefaultForm fields={profileFields} onSaveForm={handleSaveProfile} />
    </InnerLayout>
  );
}
