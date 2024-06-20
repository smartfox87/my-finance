import { useDarkTheme } from "@/hooks/theme.js";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";
import { createContext, lazy, ReactNode, Suspense, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/hooks/locale";
import { getUserId } from "@/helpers/localStorage.js";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Spinner } from "@/components/Layout/Spinner";

interface DynamicAntdType {
  StyleProvider?: any;
  ConfigProvider?: any;
  theme?: any;
}

export const AntdContext = createContext({ initAntd: () => {}, isLoadedAntd: false });

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  const darkTheme = useDarkTheme();
  const { locale } = useLocale();
  const user = useSelector(selectUser);
  const [DynamicAntd, setDynamicAntd] = useState<DynamicAntdType>();
  const [isLoadedAntd, setIsLoadedAntd] = useState(false);

  // todo fix dynamic imports
  const initAntd = () =>
    Promise.all([
      lazy(() => import("@ant-design/cssinjs/es/StyleContext").then(({ StyleProvider }) => ({ default: StyleProvider }))),
      lazy(() => import("antd/es/config-provider")),
      import("antd/es/theme"),
    ]).then(([StyleProvider, ConfigProvider, theme]) => {
      setDynamicAntd({ StyleProvider, ConfigProvider, theme: theme.default });
      setIsLoadedAntd(true);
    });

  useEffect(() => {
    if (getUserId() || user) initAntd();
  }, [user]);

  const contextValue = useMemo(() => ({ initAntd, isLoadedAntd }), [initAntd, isLoadedAntd]);

  return (
    <Suspense fallback={<Spinner isVisible />}>
      {isLoadedAntd && DynamicAntd ? (
        <AntdContext.Provider value={contextValue}>
          <AntdRegistry>
            <DynamicAntd.StyleProvider hashPriority="high">
              <DynamicAntd.ConfigProvider locale={locale} theme={{ algorithm: darkTheme ? DynamicAntd.theme.darkAlgorithm : DynamicAntd.theme.defaultAlgorithm }}>
                {children}
              </DynamicAntd.ConfigProvider>
            </DynamicAntd.StyleProvider>
          </AntdRegistry>
        </AntdContext.Provider>
      ) : (
        <AntdContext.Provider value={contextValue}>{children}</AntdContext.Provider>
      )}
    </Suspense>
  );
};
