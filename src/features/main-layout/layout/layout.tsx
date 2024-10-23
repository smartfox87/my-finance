"use client";

import { MobileNav, Header, MainNav } from "../components";
import { useViewport } from "@/hooks/viewport";
import type { ComponentChildrenProps } from "@/types/common";

export function Layout({ children }: ComponentChildrenProps) {
  const { isTablet } = useViewport();
  return (
    <>
      <Header />
      <main className="container flex grow">
        <MainNav className="container hidden !w-auto !pl-0 lg:block" />
        <div className="relative flex min-w-0 grow flex-col py-4 md:py-6 lg:ml-6">{children}</div>
      </main>
      <div className="sticky bottom-0 z-30 bg-white dark:bg-dark">{isTablet && <MobileNav />}</div>
    </>
  );
}
