import { useDarkTheme } from "@/hooks/theme.js";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";
import { createContext, ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/hooks/locale";
import { getUserId } from "@/helpers/localStorage.js";
import { Spinner } from "@/components/Layout/Spinner";
import dynamic from "next/dynamic";

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

  const initAntd = useCallback(async () => {
    setTheme(await import("antd/es/theme").then(({ default: theme }) => theme));
    setIsLoadedAntd(true);
  }, []);

  useEffect(() => {
    if (getUserId() || user) initAntd();
  }, [user]);

  const contextValue = useMemo(() => ({ initAntd, isLoadedAntd }), [initAntd, isLoadedAntd]);

  return (
    <Suspense fallback={<Spinner isVisible />}>
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
    </Suspense>
  );
};
