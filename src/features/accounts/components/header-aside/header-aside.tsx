import { InnerHeaderAsidePortal } from "@/components/layout/inner-header-aside-portal/inner-header-aside-portal";
import formatPrice from "@/utils/format-price";
import { useTranslation } from "react-i18next";
import { selectAccountsBalance } from "../../selectors";
import { selectCurrency } from "@/features/profile";
import { useAppSelector } from "@/hooks/store";

export const HeaderAside = () => {
  const { t } = useTranslation();
  const totalBalance = useAppSelector(selectAccountsBalance);
  const currency = useAppSelector(selectCurrency);

  const headerActions = (
    <div className="ml-auto font-black lg:text-lg">
      <span className="mr-1">{t("common.total")}: </span>
      {formatPrice(totalBalance)}
      {currency}
    </div>
  );

  return <InnerHeaderAsidePortal>{headerActions}</InnerHeaderAsidePortal>;
};
