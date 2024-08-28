import { useDarkTheme } from "@/hooks/theme";
import { selectUser } from "@/store/selectors/auth";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/hooks/providers/locale";
import { getUserId } from "@/helpers/localStorage";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/layout/preloader/Preloader";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/store";
import { Pages } from "@/types/router";
import type { AntdContextType, Theme } from "@/types/providers/antdProvider";
import type { ComponentChildrenProps } from "@/types/common";

const StyleProvider = dynamic(() => import("@ant-design/cssinjs/es/StyleContext").then(({ StyleProvider }) => StyleProvider));
const ConfigProvider = dynamic(() => import("antd/es/config-provider"));
const AntdRegistry = dynamic(() => import("@ant-design/nextjs-registry").then(({ AntdRegistry }) => AntdRegistry));

export const AntdContext = createContext<AntdContextType | undefined>(undefined);

export const AntdProvider = ({ children }: ComponentChildrenProps) => {
  const darkTheme = useDarkTheme();
  const { antdLocale } = useLocale();
  const user = useAppSelector(selectUser);
  const pathname = usePathname();

  const isLoadedInitState = pathname.includes(Pages.CONTACT);
  const [isLoadedAntd, setIsLoadedAntd] = useState(isLoadedInitState);
  const [theme, setTheme] = useState<Theme>();
  const [isLoadingAntd, setIsLoadingAntd] = useState(false);

  const initAntd = useCallback((): void => {
    if (!isLoadedAntd) {
      setIsLoadingAntd(true);
      setIsLoadedAntd(true);
    }
    import("antd/es/theme").then(({ default: theme }) => setTheme(theme));
  }, [isLoadedAntd]);

  useEffect((): void => {
    if ((!theme && isLoadedInitState) || (!isLoadedAntd && (getUserId() || user))) initAntd();
  }, [user, isLoadedInitState]);

  const contextValue = useMemo(() => ({ initAntd, isLoadedAntd, isLoadingAntd, setIsLoadingAntd }), [initAntd, isLoadedAntd, isLoadingAntd, setIsLoadingAntd]);

  const themeSettings = useMemo(() => (theme ? { algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm } : undefined), [theme]);

  return (
    <Preloader isLoading={isLoadingAntd}>
      {isLoadedAntd ? (
        <AntdContext.Provider value={contextValue}>
          <AntdRegistry>
            <StyleProvider hashPriority="high">
              <ConfigProvider locale={antdLocale || undefined} theme={themeSettings}>
                {children}
              </ConfigProvider>
            </StyleProvider>
          </AntdRegistry>
        </AntdContext.Provider>
      ) : (
        <AntdContext.Provider value={contextValue}>{children}</AntdContext.Provider>
      )}
    </Preloader>
  );
};
