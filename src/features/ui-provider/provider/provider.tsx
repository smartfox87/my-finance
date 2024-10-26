import { useTheme } from "../hooks/theme";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/features/locale-provider";
import { getUserId } from "@/features/user-id";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/hooks/store";
import { selectUser } from "@/store/selectors/auth";
import type { ComponentChildrenProps } from "@/types/common";
import type { Theme, UIContextType } from "../types";

const StyleProvider = dynamic(() => import("@ant-design/cssinjs/es/StyleContext").then(({ StyleProvider }) => StyleProvider));
const ConfigProvider = dynamic(() => import("antd/es/config-provider"));
const AntdRegistry = dynamic(() => import("@ant-design/nextjs-registry").then(({ AntdRegistry }) => AntdRegistry));
export const UIContext = createContext<UIContextType | undefined>({ darkTheme: false, toggleTheme: () => {} });

export const UIProvider = ({ isActive, children }: ComponentChildrenProps & { isActive?: boolean }) => {
  const [darkTheme, toggleDarkTheme] = useTheme();
  const { antdLocale } = useLocale();
  const user = useAppSelector(selectUser);

  const [isLoadedAntd, setIsLoadedAntd] = useState(false);
  const [theme, setTheme] = useState<Theme>();

  const initAntd = useCallback((): void => {
    if (!isLoadedAntd) setIsLoadedAntd(true);
    import("antd/es/theme").then(({ default: theme }) => setTheme(theme));
  }, [isLoadedAntd]);

  if (isActive && !isLoadedAntd) initAntd();

  useEffect((): void => {
    if (!isLoadedAntd && (getUserId() || user)) initAntd();
  }, [user]);

  const themeSettings = useMemo(() => (theme ? { algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm } : undefined), [theme, darkTheme]);

  const uiContextValue = useMemo(() => ({ darkTheme, toggleTheme: toggleDarkTheme }), [darkTheme]);

  return (
    <>
      {isLoadedAntd ? (
        <UIContext.Provider value={uiContextValue}>
          <AntdRegistry>
            <StyleProvider hashPriority="high">
              <ConfigProvider locale={antdLocale} theme={themeSettings}>
                <>{children}</>
              </ConfigProvider>
            </StyleProvider>
          </AntdRegistry>
        </UIContext.Provider>
      ) : (
        <UIContext.Provider value={uiContextValue}>{children}</UIContext.Provider>
      )}
    </>
  );
};
