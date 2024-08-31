import { InnerHeaderAsidePortal } from "@/components/layout/inner-header-aside-portal/inner-header-aside-portal";
import { selectCurrency } from "@/features/profile";
import formatPrice from "@/helpers/formatPrice";
import { useTranslation } from "react-i18next";
import { selectCostsByFilter, selectExpensesTotal } from "../../selectors";
import { useAppSelector } from "@/hooks/store";

export const HeaderAside = () => {
  const { t } = useTranslation();
  const currency = useAppSelector(selectCurrency);
  const totalAmount = useAppSelector(selectExpensesTotal);
  const filteredSortedCosts = useAppSelector(selectCostsByFilter);

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

  return <InnerHeaderAsidePortal>{headerActions}</InnerHeaderAsidePortal>;
};
