"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectSettingsFields } from "@/store/selectors/profile";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { getProfileThunk, updateProfileThunk } from "@/store/profileSlice";
import { showNotification } from "@/helpers/modals.js";
import { useTranslation } from "react-i18next";

export default function SettingsContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profileFields = useSelector(selectSettingsFields);

  const handleSaveProfile = async (profileData) => {
    const { error } = await dispatch(updateProfileThunk(profileData));
    if (!error) {
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.settings.update") });
    }
  };

  return <DefaultForm fields={profileFields} data-cy="edit-settings-form" onSaveForm={handleSaveProfile} />;
}
