import formatPrice from "@/helpers/formatPrice";
import { useSelector } from "react-redux";
import { selectBudgetsAmount, selectCostsAmount, selectIncomesAmount } from "@/store/selectors/statistics";
import { selectCurrency } from "@/store/selectors/profile";
import { useTranslation } from "react-i18next";

export const TotalStatistics = () => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const costsTotalAmount = useSelector(selectCostsAmount);
  const incomesTotalAmount = useSelector(selectIncomesAmount);
  const budgetsTotalAmount = useSelector(selectBudgetsAmount);

  return (
    <ul className="flex flex-col gap-x-6 gap-y-1 text-xl empty:hidden md:flex-row">
      <li>
        {t("statistics.incomes")}: {formatPrice(incomesTotalAmount)} {currency}
      </li>
      <li>
        {t("statistics.costs")}: {formatPrice(costsTotalAmount)} {currency}
      </li>
      <li>
        {t("statistics.budgets")}: {formatPrice(budgetsTotalAmount)} {currency}
      </li>
      <li className="font-bold">
        {t("common.total")}: {formatPrice(incomesTotalAmount - costsTotalAmount)} {currency}
      </li>
    </ul>
  );
};
