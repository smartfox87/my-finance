"use client";

import { Auth } from "../../Auth/Auth.jsx";
import { useSelector } from "react-redux";
import { ProfileMenu } from "@/components/Profile/ProfileMenu.jsx";
import { LanguageToggle } from "@/components/Layout/Header/LanguageToggle.jsx";
import { Logo } from "@/components/Layout/Header/Logo.jsx";
import { memo, Suspense } from "react";
import { selectUser } from "@/store/selectors/auth.js";
import { MobileMenu } from "@/components/Layout/Header/MobileMenu.jsx";
import { useViewport } from "@/hooks/viewport.js";

export const Header = memo(function Header() {
  const { viewport } = useViewport();
  const user = useSelector(selectUser);

  return (
    <header className="sticky top-0 z-50 border-b border-b-gray-300 bg-white py-4 dark:bg-dark">
      <div className="container flex items-center justify-between">
        <Logo />
        {["sm", "xs", "xxs"].includes(viewport) ? (
          <Suspense fallback={<div>Loading...</div>}>
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
