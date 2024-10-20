import { PropsList } from "../props-list";
import { getFormattedDateString } from "@/utils/get-formatted-date-string";
import { useTranslation } from "react-i18next";
import { selectProfile } from "../../selectors";
import { useAppSelector } from "@/hooks/store";

export const Dates = () => {
  const { t } = useTranslation();
  const profile = useAppSelector(selectProfile);

  if (!profile) return null;

  const datesList = [
    { prop: t("common.created_at"), value: getFormattedDateString(profile.created_at, "YYYY MMMM DD, HH:MM") },
    { prop: t("common.updated_at"), value: getFormattedDateString(profile.updated_at, "YYYY MMMM DD, HH:MM") },
  ];

  return <PropsList items={datesList} className="flex flex-wrap justify-between gap-x-6 gap-y-1" />;
};
