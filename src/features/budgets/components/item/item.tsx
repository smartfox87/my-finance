import { Date } from "../date";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { formatPrice } from "@/utils/format-price";
import { selectCurrency } from "@/features/profile";
import { uppercaseFirstLetter } from "@/utils/strings";
import { selectCostCategoriesObject } from "@/store/selectors/references";
import { useEffect, useMemo, useRef, useState } from "react";
import { checkIsTextClamped } from "@/utils/check-is-text-clamped";
import { useViewport } from "@/hooks/viewport";
import { selectAccountsObject } from "@/store/selectors/accounts";
import Link from "next/link";
import { useAppSelector } from "@/hooks/store";
import type { ProcessedBudgetItem } from "../../types";

export const Item = ({ id, created_at, name, amount, accounts, categories, period: [start_date, end_date] }: ProcessedBudgetItem) => {
  const { t } = useTranslation();
  const { isTouchDevice } = useViewport();
  const currency = useAppSelector(selectCurrency);
  const accountsObject = useAppSelector(selectAccountsObject);
  const costCategoriesObject = useAppSelector(selectCostCategoriesObject);
  const accountsValue = useMemo(() => accounts?.map((id) => accountsObject?.[id]).join(", ") || t("detail.all_accounts"), [accounts, accountsObject, t]);
  const categoriesValue = useMemo(() => categories?.map((id) => costCategoriesObject?.[id]).join(", ") || t("detail.all_categories"), [categories, costCategoriesObject, t]);
  const nameRef = useRef(null);
  const [isTooltipName, setIsTooltipName] = useState(false);
  const capitalizedName = uppercaseFirstLetter(name);

  useEffect((): void => {
    if (isTouchDevice) return;
    if (nameRef.current) setIsTooltipName(checkIsTextClamped(nameRef.current));
  }, [isTouchDevice, name]);

  return (
    <Link
      href={`/budgets?budgetId=${id}`}
      data-cy="budget-item"
      data-created={created_at}
      className="flex w-full flex-col gap-3 rounded-xl border border-gray-300 p-4 shadow-[0_3px_7px_0_#ddd] duration-300 hover:-translate-y-1 hover:shadow-[0_7px_7px_0_#ddd]"
    >
      <Date startDate={start_date} endDate={end_date} />
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
          {t("detail.accounts")}:{" "}
          <span data-cy="item-accounts" className="font-bold">
            {accountsValue}
          </span>
        </li>
        <li>
          {t("detail.categories")}:{" "}
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
