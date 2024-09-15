import { useDarkTheme } from "@/hooks/theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/hooks/providers/locale";
import { getUserId } from "@/utils/local-storage";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/hooks/store";
import { selectUser } from "@/store/selectors/auth";
import type { Theme } from "@/types/providers/antd";
import type { ComponentChildrenProps } from "@/types/common";

const StyleProvider = dynamic(() => import("@ant-design/cssinjs/es/StyleContext").then(({ StyleProvider }) => StyleProvider));
const ConfigProvider = dynamic(() => import("antd/es/config-provider"));
const AntdRegistry = dynamic(() => import("@ant-design/nextjs-registry").then(({ AntdRegistry }) => AntdRegistry));

export const AntdProvider = ({ isActive, children }: ComponentChildrenProps & { isActive: boolean }) => {
  const darkTheme = useDarkTheme();
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

  const themeSettings = useMemo(() => (theme ? { algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm } : undefined), [theme]);

  return (
    <>
      {isLoadedAntd ? (
        <AntdRegistry>
          <StyleProvider hashPriority="high">
            <ConfigProvider locale={antdLocale || undefined} theme={themeSettings}>
              {children}
            </ConfigProvider>
          </StyleProvider>
        </AntdRegistry>
      ) : (
        { children }
      )}
    </>
  );
};
