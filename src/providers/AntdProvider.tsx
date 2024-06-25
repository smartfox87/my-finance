import { useDarkTheme } from "@/hooks/theme.js";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/hooks/locale";
import { getUserId } from "@/helpers/localStorage.js";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/Layout/Preloader";
import { useDebounce } from "@/hooks/debounce";

interface Theme {
  defaultAlgorithm: any;
  darkAlgorithm: any;
}

const StyleProvider = dynamic(() => import("@ant-design/cssinjs/es/StyleContext").then(({ StyleProvider }) => StyleProvider));
const ConfigProvider = dynamic(() => import("antd/es/config-provider"));
const AntdRegistry = dynamic(() => import("@ant-design/nextjs-registry").then(({ AntdRegistry }) => AntdRegistry));

export const AntdContext = createContext({ initAntd: () => {}, isLoadedAntd: false });

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  const darkTheme = useDarkTheme();
  const { locale } = useLocale();
  const user = useSelector(selectUser);
  const [isLoadedAntd, setIsLoadedAntd] = useState(false);
  const [theme, setTheme] = useState<Theme>();
  const [isLoading, setIsLoading] = useState(false);

  const stopLoading = useDebounce(() => setIsLoading(false), 500);

  const initAntd = useCallback(async () => {
    if (!isLoadedAntd) setIsLoading(true);
    setIsLoadedAntd(true);
    setTheme(await import("antd/es/theme").then(({ default: theme }) => theme));
    stopLoading();
  }, []);

  useEffect(() => {
    if (getUserId() || user) initAntd();
  }, [user]);

  const contextValue = useMemo(() => ({ initAntd, isLoadedAntd }), [initAntd, isLoadedAntd]);

  return (
    <Preloader isLoading={isLoading}>
      {isLoadedAntd && theme ? (
        <AntdContext.Provider value={contextValue}>
          <AntdRegistry>
            <StyleProvider hashPriority="high">
              <ConfigProvider locale={locale || undefined} theme={{ algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
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
