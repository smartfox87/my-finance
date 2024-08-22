"use client";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectProfileFields } from "@/store/selectors/profile";
import { DefaultForm } from "@/components/form/DefaultForm";
import { getProfileThunk, updateProfileThunk } from "@/store/slices/profileSlice";
import { showNotification } from "@/helpers/modals";
import { useAppDispatch } from "@/types/store";
import { showCommonError } from "@/helpers/errors";
import { isProfileData } from "@/predicates/profile";
import { ProfilePageActions } from "@/components/profile/page/ProfilePageActions";
import { ProfileDates } from "@/components/profile/page/ProfileDates";
import type { DefaultFormSaveHandler } from "@/types/form";

export default function ProfileContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profileFields = useSelector(selectProfileFields);

  const handleSaveProfile: DefaultFormSaveHandler = async (profileData) => {
    try {
      if (!isProfileData(profileData)) return;
      await dispatch(updateProfileThunk(profileData)).unwrap();
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.profile.update") });
    } catch (error) {
      showCommonError();
    }
  };

  return (
    <>
      <ProfilePageActions />
      <ProfileDates />
      <DefaultForm fields={profileFields} data-cy="edit-profile-form" onSaveForm={handleSaveProfile} />
    </>
  );
}
