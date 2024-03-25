import { INIT_NAV_LIST } from "@/initial-data/navigation.jsx";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport.js";
import { memo, useMemo } from "react";
import { getLocalizeUrl } from "@/helpers/url.js";
import Link from "next/link";

export const MainNav = memo(function MainNav() {
  const { t } = useTranslation();

  const { viewport } = useViewport();

  const navLinkClasses = "hover:!text-blue-600 dark:hover:!text-blue-400 lg:py-4 py-2.5 py-2 pr-3 flex text-xl items-center gap-4 duration-300 -ml-3 pl-3 mr-3 ";
  const getNavLinkClassName = ({ isActive }) => navLinkClasses + (isActive ? "!text-blue-600 dark:!text-blue-400" : "!text-black dark:!text-white");

  const isMobile = useMemo(() => ["sm", "xs", "xxs"].includes(viewport), [viewport]);

  return (
    <nav id="navigation" className="shrink-0 border-gray-300 lg:border-r">
      <ul className={`sticky top-16 flex grow flex-col py-4 ${isMobile ? "pl-1" : "container !pl-0"}`}>
        {INIT_NAV_LIST.map(({ icon, full_name, url }) => (
          <li key={full_name} className="w-full">
            <Link href={getLocalizeUrl(url)} end className={getNavLinkClassName}>
              <div className={["sm", "xs", "xxs"].includes(viewport) ? `scale-125` : ""}>{icon}</div>
              {t(full_name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});
