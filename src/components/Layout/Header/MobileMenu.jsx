import { memo, useEffect, useState } from "react";
import SvgMenu from "@/assets/sprite/menu.svg";
import { useTranslation } from "react-i18next";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { ProfileMenu } from "@/components/Profile/ProfileMenu.jsx";
import { Auth } from "@/components/Auth/Auth.jsx";
import { LanguageToggle } from "@/components/Layout/Header/LanguageToggle.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";
import { MainNav } from "@/components/Layout/MainNav.jsx";
import { usePathname, useSearchParams } from "next/navigation";

export const MobileMenu = memo(function MobileMenu() {
  const { t } = useTranslation();

  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button type="button" className="focus-appearance -m-2 p-2" title={t("show_menu")} onClick={handleToggleVisibility}>
        <SvgMenu className="h-6 w-6" />
      </button>
      <SideModal isOpen={isOpen} onClose={handleToggleVisibility}>
        <div className="flex items-center justify-between gap-3">
          {user ? <ProfileMenu /> : <Auth />}
          <div className="ml-auto">
            <LanguageToggle />
          </div>
        </div>
        <MainNav />
      </SideModal>
    </>
  );
});
