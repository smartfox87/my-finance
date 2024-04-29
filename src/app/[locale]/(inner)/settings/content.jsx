"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectSettingsFields } from "@/store/selectors/profile";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { updateProfileThunk } from "@/store/profileSlice";

export default function SettingsContent() {
  const dispatch = useDispatch();
  const profileFields = useSelector(selectSettingsFields);

  const handleSaveProfile = (profileData) => dispatch(updateProfileThunk(profileData));

  return <DefaultForm fields={profileFields} onSaveForm={handleSaveProfile} />;
}
