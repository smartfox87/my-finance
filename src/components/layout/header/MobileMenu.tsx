import { memo, Suspense } from "react";
import SvgMenu from "@/assets/sprite/menu.svg";
import { useTranslation } from "react-i18next";
import { SideModal } from "@/components/modals/SideModal";
import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { Auth } from "@/components/auth/Auth";
import { LanguageToggle } from "@/components/layout/header/LanguageToggle";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth";
import { MainNav } from "@/components/layout/navigation/MainNav";
import { useAntd } from "@/hooks/providers/antd";
import { useModalState } from "@/hooks/providers/modalState";

export const MobileMenu = memo(function MobileMenu() {
  const { t } = useTranslation();
  const { initAntd, isLoadedAntd, isLoadingAntd } = useAntd();
  const { isOpenMenuModal, setIsOpenMenuModal } = useModalState();
  const user = useSelector(selectUser);

  const handleToggleVisibility = async () => {
    if (!isLoadedAntd) await initAntd();
    setIsOpenMenuModal((prevState) => !prevState);
  };

  return (
    <>
      <button type="button" data-cy="mobile-menu-btn" className="focus-appearance -m-2 p-2" title={t("show_menu")} onClick={handleToggleVisibility}>
        <SvgMenu className="h-6 w-6" />
      </button>
      <Suspense fallback={<div className="hidden" />}>
        <SideModal isOpen={!isLoadingAntd && isOpenMenuModal} onClose={handleToggleVisibility}>
          <div className="flex items-center justify-between gap-3">
            {user ? <ProfileMenu /> : <Auth />}
            <div className="relative z-20 ml-auto">
              <LanguageToggle />
            </div>
          </div>
          <MainNav className="pl-1" />
        </SideModal>
      </Suspense>
    </>
  );
});