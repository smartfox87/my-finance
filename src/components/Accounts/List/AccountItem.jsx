import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import formatPrice from "@/helpers/formatPrice.js";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/store/selectors/profile.jsx";
import { uppercaseFirstLetter } from "@/helpers/strings.js";
import { useEffect, useRef, useState } from "react";
import { isTextClamped } from "@/helpers/isTextClamped.js";
import { useViewport } from "@/hooks/viewport.js";
import { getFullDate } from "@/helpers/date.js";
import { getLocalizeUrl } from "@/helpers/url.js";

export const AccountItem = ({ id, name, balance, updated_at }) => {
  const { t } = useTranslation();
  const { isTouchDevice } = useViewport();
  const currency = useSelector(selectCurrency);
  const nameRef = useRef(null);
  const [isTooltipName, setIsTooltipName] = useState(false);
  const capitalizedName = uppercaseFirstLetter(name);

  useEffect(() => {
    if (isTouchDevice) return;
    if (nameRef.current) setIsTooltipName(isTextClamped(nameRef.current));
  }, [name, isTouchDevice]);

  return (
    <Link
      to={getLocalizeUrl(`/accounts/${id}`)}
      className="flex flex-wrap justify-between gap-2 rounded-xl border border-gray-300 p-4 shadow-[0_3px_7px_0_#ddd] duration-300 hover:-translate-y-1 hover:shadow-[0_7px_7px_0_#ddd]"
    >
      <div ref={nameRef} className="line-clamp-2 w-full  md:line-clamp-3">
        {isTooltipName ? (
          <Tooltip title={capitalizedName}>
            {t("detail.name")}:&nbsp; <span className="font-bold">{capitalizedName}</span>
          </Tooltip>
        ) : (
          <>
            {t("detail.name")}:&nbsp; <span className="font-bold">{capitalizedName}</span>
          </>
        )}
      </div>
      <div className=" w-full  md:w-auto">
        {t("detail.balance")}:&nbsp;&nbsp;
        <span className="font-bold">
          {formatPrice(balance)} {currency}
        </span>
      </div>
      <div className=" w-full  md:w-auto">
        {t("detail.updated_at")}:&nbsp; <span className="font-bold">{getFullDate(updated_at)}</span>
      </div>
    </Link>
  );
};

AccountItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  balance: PropTypes.number,
  updated_at: PropTypes.string,
};
