import { INIT_NAV_LIST } from "@/constants/navigation";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport";
import { memo, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNav = memo(function MobileNav() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const pathname = usePathname().replace(`/${language}`, "");
  const { isMobile, isTablet } = useViewport();

  const getNavLinkClassName = (url: string) => (url === pathname ? "text-blue-600 dark:text-blue-400" : "");

  const filteredList = useMemo(() => INIT_NAV_LIST.filter(({ mobile_nav }) => !isTablet || (isTablet && mobile_nav)), [isTablet]);

  return (
    <nav className="shrink-0 border-t border-gray-300 lg:hidden" aria-label="mobile navigation">
      <ul className="flex">
        {filteredList.map(({ icon, full_name, short_name, url }) => (
          <li key={full_name} className="w-1/12 grow">
            <Link href={url} className={`${getNavLinkClassName(url)} flex flex-col items-center gap-1 py-2 text-center text-xs duration-300 hover:text-blue-600 dark:hover:text-blue-400`}>
              {icon}
              {isMobile && short_name ? t(short_name) : t(full_name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});
