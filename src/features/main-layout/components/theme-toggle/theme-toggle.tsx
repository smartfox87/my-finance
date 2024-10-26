import { SimpleButton } from "@/components/simple-button";
import SvgTheme from "@/assets/sprite/theme.svg";
import { useUIThemeContext } from "@/features/ui-provider";

export const ThemeToggle = () => {
  const { toggleTheme } = useUIThemeContext();

  return (
    <SimpleButton onClick={toggleTheme}>
      <SvgTheme className="h-5 w-5" />
    </SimpleButton>
  );
};
