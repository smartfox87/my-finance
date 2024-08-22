import { CommonDate } from "@/components/common/CommonDate";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import formatPrice from "@/helpers/formatPrice";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile";
import { uppercaseFirstLetter } from "@/helpers/strings";
import { selectIncomeCategoriesObject } from "@/store/selectors/references";
import { useEffect, useRef, useState } from "react";
import { isTextClamped } from "@/helpers/isTextClamped";
import { useViewport } from "@/hooks/viewport";
import { selectAccountsObject } from "@/store/selectors/accounts";
import Link from "next/link";
import type { IncomeItem } from "@/types/incomes";

export const IncomeListItem = ({ id, created_at, name, amount, date, category, account }: IncomeItem) => {
  const { t } = useTranslation();
  const { isTouchDevice } = useViewport();
  const currency = useSelector(selectCurrency);
  const incomeCategoriesObject = useSelector(selectIncomeCategoriesObject);
  const accountsObject = useSelector(selectAccountsObject);
  const nameRef = useRef(null);
  const [isTooltipName, setIsTooltipName] = useState(false);
  const capitalizedName = uppercaseFirstLetter(name);

  useEffect((): void => {
    if (isTouchDevice) return;
    if (nameRef.current) setIsTooltipName(isTextClamped(nameRef.current));
  }, [name, isTouchDevice]);

  return (
    <Link
      href={`/incomes?incomeId=${id}`}
      data-cy="income-item"
      data-created={created_at}
      className="focus-appearance flex w-full flex-col gap-3 rounded-xl border border-gray-300 p-4 shadow-[0_3px_7px_0_#ddd] duration-300 hover:-translate-y-1 hover:shadow-[0_7px_7px_0_#ddd]"
    >
      <CommonDate date={date} />
      <ul className="flex grow flex-col gap-1">
        {capitalizedName?.length && (
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
        )}
        <li>
          {t("detail.account")}:{" "}
          <span data-cy="item-accounts" className="font-bold">
            {accountsObject?.[account]}
          </span>
        </li>
        <li>
          {t("detail.category")}:{" "}
          <span data-cy="item-categories" className="font-bold">
            {incomeCategoriesObject?.[category]}
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
