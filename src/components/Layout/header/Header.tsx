"use client";

import { Auth } from "@/components/auth/Auth";
import { useSelector } from "react-redux";
import { ProfileMenu } from "@/components/Profile/ProfileMenu";
import { LanguageToggle } from "@/components/Layout/header/LanguageToggle";
import { Logo } from "@/components/Layout/header/Logo";
import { memo, Suspense } from "react";
import { selectUser } from "@/store/selectors/auth";
import { MobileMenu } from "@/components/Layout/header/MobileMenu";
import { useViewport } from "@/hooks/viewport";

export const Header = memo(function Header() {
  const { isTablet } = useViewport();
  const user = useSelector(selectUser);

  return (
    <header className="sticky top-0 z-50 border-b border-b-gray-300 bg-white py-4 dark:bg-dark">
      <div className="container flex items-center justify-between">
        <Logo />
        {isTablet ? (
          <Suspense fallback={<div />}>
            <MobileMenu />
          </Suspense>
        ) : (
          <div className="flex items-center gap-2 md:gap-4">
            {user ? <ProfileMenu /> : <Auth />}
            <LanguageToggle />
          </div>
        )}
      </div>
    </header>
  );
});
