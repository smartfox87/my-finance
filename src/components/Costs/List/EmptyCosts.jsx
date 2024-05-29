import { useTranslation } from "react-i18next";

export const EmptyCosts = ({ addNew }) => {
  const { t } = useTranslation();

  return (
    <div data-cy="empty-expenses" className="my-20 flex flex-col items-center gap-6">
      <h2 className=" text-center text-xl font-bold">{t("common.empty_expenses")}</h2>
      {addNew}
    </div>
  );
};
