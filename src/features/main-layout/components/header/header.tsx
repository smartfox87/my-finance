"use client";

import { Auth } from "../auth";
import { LanguageToggle } from "../language-toggle";
import { Logo } from "../logo";
import { memo, Suspense } from "react";
import { selectUser } from "@/store/selectors/auth";
import { MobileMenu } from "../mobile-menu";
import { useViewport } from "@/hooks/viewport";
import { useAppSelector } from "@/hooks/store";
import { ProfileMenu } from "../profile-menu";

export const Header = memo(function Header() {
  const { isTablet } = useViewport();
  const user = useAppSelector(selectUser);

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
