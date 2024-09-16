import { memo, useState } from "react";
import SvgMenu from "@/assets/sprite/menu.svg";
import { useTranslation } from "react-i18next";
import { Auth } from "../auth";
import { LanguageToggle } from "../language-toggle";
import { selectUser } from "@/store/selectors/auth";
import { MainNav } from "../main-nav";
import { useAppSelector } from "@/hooks/store";
import { ProfileMenu } from "../profile-menu";
import SvgClose from "@/assets/sprite/close.svg";

export const MobileMenu = memo(function MobileMenu() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(true);

  const handleToggleVisibility = (): void => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setIsDestroyed(true), 500);
    } else {
      setIsDestroyed(false);
      setTimeout(() => setIsOpen(true), 0);
    }
  };

  return (
    <>
      <button type="button" data-cy="mobile-menu-btn" className="focus-appearance -m-2 p-2" title={t("show_menu")} onClick={handleToggleVisibility}>
        <SvgMenu className="h-6 w-6" />
      </button>
      {!isDestroyed && (
        <section
          className={`fixed bottom-0 left-0 z-50 h-full w-full bg-white text-black duration-500 dark:bg-dark-modal dark:text-white ${isOpen ? "visible translate-y-0" : "invisible translate-y-full"}`}
        >
          <header className="flex border-b border-gray-300 p-6">
            <button className="-m-4 p-4" type="button" onClick={handleToggleVisibility}>
              <SvgClose className="h-4 w-4" />
            </button>
          </header>
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              {user ? <ProfileMenu /> : <Auth />}
              <div className="relative z-20 ml-auto">
                <LanguageToggle />
              </div>
            </div>
            <MainNav className="pl-1" />
          </div>
        </section>
      )}
    </>
  );
});
