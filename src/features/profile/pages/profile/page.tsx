"use client";

import { useTranslation } from "react-i18next";
import { selectProfileFields } from "../../selectors";
import { DefaultForm } from "@/features/default-form";
import { getProfileThunk, updateProfileThunk } from "../../store";
import { showNotification } from "@/utils/modals";
import { showCommonError } from "@/utils/errors";
import { isProfileData } from "../../predicates";
import { HeaderAside } from "../../components";
import { Dates } from "../../components";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { DefaultFormSaveHandler } from "@/types/form";

export default function Page() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profileFields = useAppSelector(selectProfileFields);

  const handleSaveProfile: DefaultFormSaveHandler = async (profileData) => {
    try {
      if (!isProfileData(profileData)) return;
      await dispatch(updateProfileThunk(profileData)).unwrap();
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.profile.update") });
    } catch (error) {
      showCommonError({ error });
    }
  };

  return (
    <>
      <HeaderAside />
      <Dates />
      <DefaultForm fields={profileFields} data-cy="edit-profile-form" onSaveForm={handleSaveProfile} />
    </>
  );
}
