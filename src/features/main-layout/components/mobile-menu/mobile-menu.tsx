import { memo, useState } from "react";
import SvgMenu from "@/assets/sprite/menu.svg";
import { useTranslation } from "react-i18next";
import { SideModal } from "@/components/modals/side-modal";
import { Auth } from "../auth";
import { LanguageToggle } from "../language-toggle";
import { selectUser } from "@/store/selectors/auth";
import { MainNav } from "../main-nav";
import { useAppSelector } from "@/hooks/store";
import { ProfileMenu } from "../profile-menu";

export const MobileMenu = memo(function MobileMenu() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleVisibility = (): void => setIsOpen(true);

  return (
    <>
      <button type="button" data-cy="mobile-menu-btn" className="focus-appearance -m-2 p-2" title={t("show_menu")} onClick={handleToggleVisibility}>
        <SvgMenu className="h-6 w-6" />
      </button>
      <section className={`fixed bottom-0 left-0 z-50 h-full w-full bg-white text-black duration-500 dark:bg-dark-modal dark:text-white ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <header className="ant-drawer-header ant-drawer-header-close-only">
          <div className="ant-drawer-header-title">
            <button type="button" aria-label="Close" className="ant-drawer-close" onClose={handleToggleVisibility}>
              <span role="img" aria-label="close" className="anticon anticon-close">
                <svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </span>
            </button>
          </div>
        </header>
        <div className="flex items-center justify-between gap-3">
          {user ? <ProfileMenu /> : <Auth />}
          <div className="relative z-20 ml-auto">
            <LanguageToggle />
          </div>
        </div>
        <MainNav className="pl-1" />
      </section>
    </>
  );
});
