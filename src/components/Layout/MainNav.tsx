import { INIT_NAV_LIST } from "@/initial-data/navigation.jsx";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { getLocalizeUrl } from "@/helpers/url.js";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNav = memo(function MainNav({ className = "" }: { className?: string }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const pathname = usePathname().replace(`/${language}`, "");

  const getNavLinkClassName = (url: string) => (url === pathname ? "!text-blue-600 dark:!text-blue-400" : "!text-black dark:!text-white");

  return (
    <nav className={`shrink-0 border-r border-gray-300 ${className}`} aria-label="desktop navigation">
      <ul className="container sticky top-16 flex grow flex-col py-4 !pl-0">
        {INIT_NAV_LIST.map(({ icon, full_name, url }) => (
          <li key={full_name} className="w-full">
            <Link
              href={getLocalizeUrl(url)}
              className={`${getNavLinkClassName(getLocalizeUrl(url))} -ml-3 mr-3 flex items-center gap-4 py-4 pl-3 pr-3 text-xl duration-300 hover:!text-blue-600 dark:hover:!text-blue-400 `}
            >
              {icon}
              {t(full_name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});
