import { BudgetDate } from "./BudgetDate.jsx";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import formatPrice from "@/helpers/formatPrice.js";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { uppercaseFirstLetter } from "@/helpers/strings.js";
import { selectCostCategoriesObject } from "@/store/selectors/references.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { isTextClamped } from "@/helpers/isTextClamped.js";
import { useViewport } from "@/hooks/viewport.js";
import { selectAccountsObject } from "@/store/selectors/accounts.js";
import { getLocalizeUrl } from "@/helpers/url.js";
import Link from "next/link";

export const BudgetItem = ({ id, name, amount, accounts, categories, period: [start_date, end_date] }) => {
  const { t } = useTranslation();
  const { isTouchDevice } = useViewport();
  const currency = useSelector(selectCurrency);
  const accountsObject = useSelector(selectAccountsObject);
  const costCategoriesObject = useSelector(selectCostCategoriesObject);
  const accountsValue = useMemo(() => accounts?.map(({ id }) => accountsObject?.[id]).join(", ") || t("detail.all_accounts"), [accounts, accountsObject, t]);
  const categoriesValue = useMemo(() => categories?.map(({ id }) => costCategoriesObject?.[id]).join(", ") || t("detail.all_categories"), [categories, costCategoriesObject, t]);
  const nameRef = useRef(null);
  const [isTooltipName, setIsTooltipName] = useState(false);
  const capitalizedName = uppercaseFirstLetter(name);

  useEffect(() => {
    if (isTouchDevice) return;
    if (nameRef.current) setIsTooltipName(isTextClamped(nameRef.current));
  }, [isTouchDevice, name]);

  return (
    <Link
      href={getLocalizeUrl(`/budgets/${id}`)}
      className="flex w-full flex-col gap-3 rounded-xl border border-gray-300 p-4 shadow-[0_3px_7px_0_#ddd] duration-300 hover:-translate-y-1 hover:shadow-[0_7px_7px_0_#ddd]"
    >
      <BudgetDate startDate={start_date} endDate={end_date} />
      <ul className="flex grow flex-col gap-1">
        <li className="line-clamp-2 md:line-clamp-3">
          {isTooltipName ? (
            <Tooltip title={capitalizedName}>
              {t("detail.name")}: <span className="font-bold">{capitalizedName}</span>
            </Tooltip>
          ) : (
            <>
              {t("detail.name")}: <span className="font-bold">{capitalizedName}</span>
            </>
          )}
        </li>
        <li>
          {t("detail.account")}: <span className="font-bold">{accountsValue}</span>
        </li>
        <li>
          {t("detail.category")}: <span className="font-bold">{categoriesValue}</span>
        </li>
        <li className="mt-auto pt-2">
          {t("detail.amount")}:{" "}
          <span className="font-bold">
            {formatPrice(amount)} {currency}
          </span>
        </li>
      </ul>
    </Link>
  );
};
