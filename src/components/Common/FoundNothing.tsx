import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

export const FoundNothing = ({ clearFilter }: { clearFilter?: ReactNode }) => {
  const { t } = useTranslation();

  return (
    <div className="my-20 flex flex-col items-center gap-6">
      <p className="text-center text-xl font-bold">{t("common.found_nothing")}</p>
      {clearFilter}
    </div>
  );
};
