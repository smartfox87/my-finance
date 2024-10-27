import { INIT_NAV_LIST } from "../../constants";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNav = memo(function MainNav({ className = "", onCloseMenu }: { className?: string; onCloseMenu?: () => void }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const pathname = usePathname().replace(`/${language}`, "") || "/";
  const getNavLinkClassName = (url: string): string => (url === pathname ? "!text-blue-600 dark:!text-blue-400" : "!text-black dark:!text-white");

  return (
    <nav className={`shrink-0 border-gray-300 xl:border-r ${className}`} aria-label="desktop navigation">
      <ul className="sticky top-16 flex grow flex-col py-4">
        {INIT_NAV_LIST.map(({ icon, full_name, url }) => (
          <li key={full_name} className="w-full">
            <Link
              href={url}
              className={`${getNavLinkClassName(url)} -ml-3 mr-3 flex items-center gap-3 py-3 pl-3 pr-3 text-lg duration-300 hover:!text-blue-600 dark:hover:!text-blue-400`}
              onClick={onCloseMenu}
            >
              <div className="flex h-6 w-6 items-center justify-center xl:h-8 xl:w-8">{icon}</div>
              <div className="mt-0.5">{t(full_name)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});
