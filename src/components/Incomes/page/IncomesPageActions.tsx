import { InnerHeaderActionsPortal } from "@/components/layout/inner/InnerHeaderActionsPortal";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile";
import formatPrice from "@/helpers/formatPrice";
import { selectIncomesAmount, selectIncomesByFilter } from "@/store/selectors/incomes";
import { useTranslation } from "react-i18next";

export const IncomesPageActions = () => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const filteredSortedIncomes = useSelector(selectIncomesByFilter);
  const totalAmount = useSelector(selectIncomesAmount);

  const headerActions = Array.isArray(filteredSortedIncomes) && (
    <>
      <div className="mr-auto flex gap-1">
        <span data-cy="incomes-items-count">{filteredSortedIncomes?.length}</span>
        {t("common.items")}
      </div>
      <div className="font-black lg:text-lg">
        <span className="mr-1">{t("common.total")}: </span>
        {formatPrice(totalAmount)}
        {currency}
      </div>
    </>
  );

  return <InnerHeaderActionsPortal>{headerActions}</InnerHeaderActionsPortal>;
};
