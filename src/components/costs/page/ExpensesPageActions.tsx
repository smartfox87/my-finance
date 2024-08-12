import { InnerHeaderActionsPortal } from "@/components/layout/inner/InnerHeaderActionsPortal";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile";
import formatPrice from "@/helpers/formatPrice";
import { useTranslation } from "react-i18next";
import { selectCostsByFilter, selectExpensesTotal } from "@/store/selectors/costs";

export const ExpensesPageActions = () => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const totalAmount = useSelector(selectExpensesTotal);
  const filteredSortedCosts = useSelector(selectCostsByFilter);

  const headerActions = Array.isArray(filteredSortedCosts) && (
    <>
      <div className="mr-auto flex gap-1">
        <span data-cy="expenses-items-count">{filteredSortedCosts?.length}</span>
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
