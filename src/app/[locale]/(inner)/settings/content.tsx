"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectSettingsFields } from "@/store/selectors/profile";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { getProfileThunk, updateProfileThunk } from "@/store/profileSlice";
import { showNotification } from "@/helpers/modals.js";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/redux";
import { showCommonError } from "@/helpers/errors";
import { FieldValues } from "@/types/field";
import { DefaultFormSaveHandler } from "@/types/form";
import { isSettingsData } from "@/predicates/profile";

export default function SettingsContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profileFields = useSelector(selectSettingsFields);

  const handleSaveProfile: DefaultFormSaveHandler = async (profileData) => {
    try {
      if (!isSettingsData(profileData)) return;
      await dispatch(updateProfileThunk(profileData)).unwrap();
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.settings.update") });
    } catch (error) {
      showCommonError();
    }
  };

  return <DefaultForm fields={profileFields} data-cy="edit-settings-form" onSaveForm={handleSaveProfile} />;
}
