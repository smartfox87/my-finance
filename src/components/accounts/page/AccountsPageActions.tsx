import { InnerHeaderActionsPortal } from "@/components/layout/inner/InnerHeaderActionsPortal";
import formatPrice from "@/helpers/formatPrice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAccountsBalance } from "@/store/selectors/accounts";
import { selectCurrency } from "@/store/selectors/profile";

export const AccountsPageActions = () => {
  const { t } = useTranslation();
  const totalBalance = useSelector(selectAccountsBalance);
  const currency = useSelector(selectCurrency);

  const headerActions = (
    <div className="ml-auto font-black lg:text-lg">
      <span className="mr-1">{t("common.total")}: </span>
      {formatPrice(totalBalance)}
      {currency}
    </div>
  );

  return <InnerHeaderActionsPortal>{headerActions}</InnerHeaderActionsPortal>;
};
