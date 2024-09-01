import { useTranslation } from "react-i18next";

export const Info = () => {
  const { t } = useTranslation();

  return (
    <section className="flex shrink-0 flex-col gap-4" itemScope itemType="https://schema.org/Organization" data-cy="contact-info">
      <h2 className="text-2xl font-bold" itemProp="name">
        {t("seo.app_name")} & A.D.
      </h2>
      <ul className="flex flex-col gap-3">
        <li className="flex gap-2">
          <b className="font-bold">{t("info.phone")}:</b>
          <a href="tel:+48573098898" itemProp="telephone">
            +48 573 098 898
          </a>
        </li>
        <li className="flex gap-2">
          <b className="font-bold">{t("info.email")}:</b>
          <a href="mailto:contact@myfinance.day" itemProp="email">
            contact@myfinance.day
          </a>
        </li>
        <li className="flex gap-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <b className="font-bold">{t("info.address")}:</b>
          <p>
            <span itemProp="streetAddress">Waska 15</span>, <span itemProp="postalCode">15-481 </span>
            <span itemProp="addressLocality">Bialystok, Poland</span>
          </p>
        </li>
        <li className="flex gap-2">
          <b className="font-bold">{t("info.working_hours")}:</b> {t("info.every_day")} | 9:00 - 21:00
        </li>
      </ul>
    </section>
  );
};
