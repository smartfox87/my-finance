import { CommonDate } from "@/components/common/CommonDate";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import formatPrice from "@/utils/format-price";
import { selectCurrency } from "@/features/profile";
import { uppercaseFirstLetter } from "@/utils/strings";
import { selectCostCategoriesObject } from "@/store/selectors/references";
import { useEffect, useRef, useState } from "react";
import { isTextClamped } from "@/utils/is-text-clamped";
import { useViewport } from "@/hooks/viewport";
import { selectAccountsObject } from "@/features/accounts";
import Link from "next/link";
import { useAppSelector } from "@/hooks/store";
import type { CostItem } from "../../types";

export const Item = ({ id, created_at, name, amount, date, category, account }: CostItem) => {
  const { t } = useTranslation();
  const { isTouchDevice } = useViewport();
  const currency = useAppSelector(selectCurrency);
  const costCategoriesObject = useAppSelector(selectCostCategoriesObject);
  const accountsObject = useAppSelector(selectAccountsObject);
  const nameRef = useRef(null);
  const [isTooltipName, setIsTooltipName] = useState(false);
  const capitalizedName = uppercaseFirstLetter(name);

  useEffect((): void => {
    if (isTouchDevice) return;
    if (nameRef.current) setIsTooltipName(isTextClamped(nameRef.current));
  }, [name, isTouchDevice]);

  return (
    <Link
      href={`/expenses?costId=${id}`}
      data-cy="expense-item"
      data-created={created_at}
      className="flex w-full flex-col gap-3 rounded-xl border border-gray-300 p-4 shadow-[0_3px_7px_0_#ddd] duration-300 hover:-translate-y-1 hover:shadow-[0_7px_7px_0_#ddd]"
    >
      <CommonDate date={date} />
      <ul className="flex grow flex-col gap-1">
        <li ref={nameRef} className="line-clamp-2 md:line-clamp-3">
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
            {accountsObject?.[account]}
          </span>
        </li>
        <li>
          {t("detail.category")}:{" "}
          <span data-cy="item-categories" className="font-bold">
            {costCategoriesObject?.[category]}
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
