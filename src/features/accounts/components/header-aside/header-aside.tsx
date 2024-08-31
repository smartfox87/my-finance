import { InnerHeaderActionsPortal } from "@/components/layout/inner/InnerHeaderActionsPortal";
import formatPrice from "@/helpers/formatPrice";
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

  return <InnerHeaderActionsPortal>{headerActions}</InnerHeaderActionsPortal>;
};
