import PropTypes from "prop-types";
import { useDarkTheme } from "@/hooks/theme.js";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";
import { createContext, lazy, useEffect, useState } from "react";
import { useLocale } from "@/hooks/locale.js";
import { getUserId } from "@/helpers/localStorage.js";

export const AntdContext = createContext();

export const AntdProvider = ({ children }) => {
  const darkTheme = useDarkTheme();
  const { locale } = useLocale();
  const user = useSelector(selectUser);
  const [DynamicAntd, setDynamicAntd] = useState();
  const [isLoadedAntd, setIsLoadedAntd] = useState(false);

  const initAntd = async () =>
    Promise.all([lazy(() => import("@ant-design/cssinjs").then(({ StyleProvider }) => ({ default: StyleProvider }))), import("antd")]).then(([StyleProvider, { ConfigProvider, theme }]) => {
      setDynamicAntd({ StyleProvider, ConfigProvider, theme });
      setIsLoadedAntd(true);
    });

  useEffect(() => {
    if (getUserId() || user) initAntd();
  }, [user]);

  if (DynamicAntd)
    return (
      <AntdContext.Provider value={{ initAntd, isLoadedAntd }}>
        <DynamicAntd.StyleProvider hashPriority="high">
          <DynamicAntd.ConfigProvider locale={locale} theme={{ algorithm: darkTheme ? DynamicAntd.theme.darkAlgorithm : DynamicAntd.theme.defaultAlgorithm }}>
            {children}
          </DynamicAntd.ConfigProvider>
        </DynamicAntd.StyleProvider>
      </AntdContext.Provider>
    );
  return <AntdContext.Provider value={{ initAntd, isLoadedAntd }}>{children}</AntdContext.Provider>;
};

AntdProvider.propTypes = {
  children: PropTypes.node,
};
