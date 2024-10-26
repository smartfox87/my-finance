"use client";

import { SimpleButton } from "@/components/simple-button";
import SvgTheme from "@/assets/sprite/theme.svg";
import { useTheme } from "@/features/ui-provider";

export const ThemeToggle = () => {
  const [_, theme, toggleTheme] = useTheme();

  return (
    <SimpleButton title={theme} onClick={toggleTheme}>
      <SvgTheme className="h-5 w-5" />
    </SimpleButton>
  );
};
