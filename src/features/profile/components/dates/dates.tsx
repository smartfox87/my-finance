import { PropValueList } from "@/components/common/PropValueList";
import { getFullDate } from "@/helpers/date";
import { useTranslation } from "react-i18next";
import { selectProfile } from "../../selectors";
import { useAppSelector } from "@/hooks/store";

export const Dates = () => {
  const { t } = useTranslation();
  const profile = useAppSelector(selectProfile);

  const datesList = [
    { prop: t("common.created_at"), value: getFullDate(profile?.created_at, "YYYY MMMM DD, HH:MM") },
    { prop: t("common.updated_at"), value: getFullDate(profile?.updated_at, "YYYY MMMM DD, HH:MM") },
  ];

  return <PropValueList items={datesList} className="flex flex-wrap justify-between gap-x-6 gap-y-1" />;
};
