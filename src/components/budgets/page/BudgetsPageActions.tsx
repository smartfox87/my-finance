import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectBudgetsAmount, selectBudgetsByFilter } from "@/store/selectors/budgets";
import { selectCurrency } from "@/store/selectors/profile";
import formatPrice from "@/helpers/formatPrice";
import { InnerHeaderActionsPortal } from "@/components/layout/inner/InnerHeaderActionsPortal";

export const BudgetsPageActions = () => {
  const { t } = useTranslation();
  const filteredSortedBudgets = useSelector(selectBudgetsByFilter);
  const totalAmount = useSelector(selectBudgetsAmount);
  const currency = useSelector(selectCurrency);

  const headerActions = Array.isArray(filteredSortedBudgets) && (
    <>
      <div className="mr-auto flex gap-1">
        <span data-cy="budgets-items-count">{filteredSortedBudgets?.length}</span> {t("common.items")}
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
