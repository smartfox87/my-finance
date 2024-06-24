import en from "antd/locale/en_US";
import de from "antd/locale/de_DE";
import es from "antd/locale/es_ES";
import it from "antd/locale/it_IT";
import fr from "antd/locale/fr_FR";
import pl from "antd/locale/pl_PL";
import hi from "antd/locale/hi_IN";
import zh from "antd/locale/zh_CN";
import ru from "antd/locale/ru_RU";
import { Locale, Locales } from "@/types/router";

export type AntdLocale = typeof en;

const localesMap: Record<Locale, AntdLocale> = {
  [Locales.EN]: en,
  [Locales.DE]: de,
  [Locales.IT]: it,
  [Locales.ES]: es,
  [Locales.FR]: fr,
  [Locales.PL]: pl,
  [Locales.ZH]: zh,
  [Locales.HI]: hi,
  [Locales.RU]: ru,
};

export default localesMap;
