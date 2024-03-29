import { INIT_NAV_LIST } from "@/initial-data/navigation.jsx";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport.js";
import { memo, useMemo } from "react";
import { getLocalizeUrl } from "@/helpers/url.js";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNav = memo(function MobileNav({ className = "" }: { className?: string }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const pathname = usePathname().replace(`/${language}`, "");
  const { viewport } = useViewport();

  const getNavLinkClassName = (url: string) => (url === pathname ? "text-blue-600 dark:text-blue-400" : "");

  const isMobile = useMemo(() => ["sm", "xs", "xxs"].includes(viewport), [viewport]);
  const filteredList = useMemo(() => INIT_NAV_LIST.filter(({ mobile_nav }) => !isMobile || (isMobile && mobile_nav)), [isMobile]);

  return (
    <nav className={`shrink-0 border-t border-gray-300 ${className}`} aria-label="mobile navigation">
      <ul className="flex">
        {filteredList.map(({ icon, full_name, short_name, url }) => (
          <li key={full_name} className="w-1/12 grow">
            <Link
              href={getLocalizeUrl(url)}
              className={`${getNavLinkClassName(getLocalizeUrl(url))} flex flex-col items-center gap-1 py-2 text-center text-xs duration-300 hover:text-blue-600 dark:hover:text-blue-400 `}
            >
              {icon}
              {["xs", "xxs"].includes(viewport) && short_name ? t(short_name) : t(full_name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});
