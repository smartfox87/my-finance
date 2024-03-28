"use client";

import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "@/hooks/injectReducer";
import { selectSettingsFields } from "@/store/selectors/profile";
import { DefaultForm } from "@/components/Form/DefaultForm";

export default function SettingsContent() {
  const dispatch = useDispatch();
  const { thunks } = useInjectReducer();
  const profileFields = useSelector(selectSettingsFields);

  const handleSaveProfile = (profileData) => dispatch(thunks.profile.updateProfileThunk(profileData));

  return <DefaultForm fields={profileFields} onSaveForm={handleSaveProfile} />;
}
