import SvgLogo from "@/assets/sprite/logo.svg";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <Link href="/" title={t("buttons.go_home")} className="-ml-1.5 -mt-2 flex items-center gap-2 text-gray-700 duration-300 hover:text-gray-900 dark:text-white/70 dark:hover:text-white/90">
      <SvgLogo className="h-10 w-10" />
      <div className="text-2xl font-bold">{t("seo.app_name")}</div>
    </Link>
  );
};
