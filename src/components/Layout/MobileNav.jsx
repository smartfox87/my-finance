import { INIT_NAV_LIST } from "@/initial-data/navigation.jsx";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport.js";
import { memo, useMemo } from "react";
import { getLocalizeUrl } from "@/helpers/url.js";
import Link from "next/link";

export const MobileNav = memo(function MobileNav() {
  const { t } = useTranslation();

  const { viewport } = useViewport();

  const navLinkClasses =
    "hover:text-blue-600 dark:hover:text-blue-400 lg:py-4 py-2 lg:pr-3 lg:flex-row flex-col flex lg:text-xl text-xs items-center lg:gap-4 gap-1 duration-300 lg:text-left text-center lg:-ml-3 lg:pl-3 lg:mr-3 ";
  const getNavLinkClassName = ({ isActive }) => navLinkClasses + (isActive ? "text-blue-600 dark:text-blue-400" : "");

  const isMobile = useMemo(() => ["sm", "xs", "xxs"].includes(viewport), [viewport]);
  const filteredList = useMemo(() => INIT_NAV_LIST.filter(({ mobile_nav }) => !isMobile || (isMobile && mobile_nav)), [isMobile]);

  return (
    <nav id="navigation" className="shrink-0 border-t border-gray-300">
      <ul className="sticky top-16 flex">
        {filteredList.map(({ icon, full_name, short_name, url }) => (
          <li key={full_name} className="w-1/12 grow">
            <Link href={getLocalizeUrl(url)} end className={getNavLinkClassName}>
              {icon}
              {["xs", "xxs"].includes(viewport) && short_name ? t(short_name) : t(full_name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});
