import { useTranslation } from "react-i18next";
import { selectBudgetsAmount, selectBudgetsByFilter } from "../../selectors";
import { selectCurrency } from "@/features/profile";
import formatPrice from "@/utils/format-price";
import { InnerHeaderAsidePortal } from "@/features/inner-layout";
import { useAppSelector } from "@/hooks/store";

export const HeaderAside = () => {
  const { t } = useTranslation();
  const filteredSortedBudgets = useAppSelector(selectBudgetsByFilter);
  const totalAmount = useAppSelector(selectBudgetsAmount);
  const currency = useAppSelector(selectCurrency);

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

  return <InnerHeaderAsidePortal>{headerActions}</InnerHeaderAsidePortal>;
};
