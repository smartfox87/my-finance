import { BudgetDate } from "./BudgetDate";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import formatPrice from "@/helpers/formatPrice.js";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile";
import { uppercaseFirstLetter } from "@/helpers/strings.js";
import { selectCostCategoriesObject } from "@/store/selectors/references";
import { useEffect, useMemo, useRef, useState } from "react";
import { isTextClamped } from "@/helpers/isTextClamped.js";
import { useViewport } from "@/hooks/viewport";
import { selectAccountsObject } from "@/store/selectors/accounts";
import Link from "next/link";
import { ProcessedBudgetItem } from "@/types/budgets";

export const BudgetItem = ({ id, created_at, name, amount, accounts, categories, period: [start_date, end_date] }: ProcessedBudgetItem) => {
  const { t } = useTranslation();
  const { isTouchDevice } = useViewport();
  const currency = useSelector(selectCurrency);
  const accountsObject = useSelector(selectAccountsObject);
  const costCategoriesObject = useSelector(selectCostCategoriesObject);
  const accountsValue = useMemo(() => accounts?.map((id) => accountsObject?.[id]).join(", ") || t("detail.all_accounts"), [accounts, accountsObject, t]);
  const categoriesValue = useMemo(() => categories?.map((id) => costCategoriesObject?.[id]).join(", ") || t("detail.all_categories"), [categories, costCategoriesObject, t]);
  const nameRef = useRef(null);
  const [isTooltipName, setIsTooltipName] = useState(false);
  const capitalizedName = uppercaseFirstLetter(name);

  useEffect(() => {
    if (isTouchDevice) return;
    if (nameRef.current) setIsTooltipName(isTextClamped(nameRef.current));
  }, [isTouchDevice, name]);

  return (
    <Link
      href={`/budgets?budgetId=${id}`}
      data-cy="budget-item"
      data-created={created_at}
      className="flex w-full flex-col gap-3 rounded-xl border border-gray-300 p-4 shadow-[0_3px_7px_0_#ddd] duration-300 hover:-translate-y-1 hover:shadow-[0_7px_7px_0_#ddd]"
    >
      <BudgetDate startDate={start_date} endDate={end_date} />
      <ul className="flex grow flex-col gap-1">
        <li className="line-clamp-2 md:line-clamp-3">
          {isTooltipName ? (
            <Tooltip title={capitalizedName}>
              {t("detail.name")}:{" "}
              <span data-cy="item-name" className="font-bold">
                {capitalizedName}
              </span>
            </Tooltip>
          ) : (
            <>
              {t("detail.name")}:{" "}
              <span data-cy="item-name" className="font-bold">
                {capitalizedName}
              </span>
            </>
          )}
        </li>
        <li>
          {t("detail.account")}:{" "}
          <span data-cy="item-accounts" className="font-bold">
            {accountsValue}
          </span>
        </li>
        <li>
          {t("detail.category")}:{" "}
          <span data-cy="item-categories" className="font-bold">
            {categoriesValue}
          </span>
        </li>
        <li className="mt-auto pt-2">
          {t("detail.amount")}:{" "}
          <span data-cy="item-amount" className="font-bold">
            {formatPrice(amount)} {currency}
          </span>
        </li>
      </ul>
    </Link>
  );
};
