"use client";

import { useTranslation } from "react-i18next";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { showNotification } from "@/helpers/modals";
import { useRecaptcha } from "@/hooks/providers/recaptcha";
import { selectContactFields } from "@/store/selectors/contact";
import { useSelector } from "react-redux";
import { Organization, WithContext } from "schema-dts";
import { languages } from "@/constants/router";
import { FormValues } from "@/types/form";
import { isRcFileArray } from "@/predicates/field";
import { isStringNumber } from "@/predicates/common";
import { showCommonError } from "@/helpers/errors";

export default function ContactContent() {
  const { t } = useTranslation();
  const contactFields = useSelector(selectContactFields);
  const { initCaptcha, isLoadedCaptcha, getScore } = useRecaptcha();

  const handleFieldChange = () => {
    if (!isLoadedCaptcha) initCaptcha();
  };

  const handleSendMessage = async (contactData: FormValues): Promise<void> => {
    try {
      const score = await getScore();
      if (score < 0.5) return showNotification({ title: t("notifications.recaptcha_invalid") });
      const formData = new FormData();
      Object.entries(contactData)
        .filter(([key, value]) => !!value)
        .forEach(([key, value]) => {
          if (isRcFileArray(value)) value.forEach((value) => formData.append(key, value));
          else if (isStringNumber(value)) formData.append(key, value.toString());
        });
      const { success, error } = await fetch("/api/contact", { method: "POST", body: formData }).then((res) => res.json());
      if (success) {
        showNotification({ title: t("notifications.contact.success") });
      } else {
        console.error(error);
        showCommonError();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        showNotification({ title: error.message || t("notifications.error.common") });
      }
    }
  };

  const jsonLdOrganization: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${t("seo.app_name")} & A.D.`,
    legalName: "Andrei Dyminski",
    url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    logo: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/assets/favicon/maskable-icon-512x512.png`,
    foundingDate: "2023",
    founder: [
      {
        "@type": "Person",
        name: "Andrei Dyminski",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+48-573-098-898",
        contactType: "customer service",
        availableLanguage: ["English", "Russian"],
        areaServed: "PL",
      },
      {
        "@type": "ContactPoint",
        email: "contact@myfinance.day",
        contactType: "customer service",
        availableLanguage: languages,
        areaServed: "PL",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Waska 15",
      addressLocality: "Bialystok",
      postalCode: "15481",
      addressCountry: "PL",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
      <>
        <DefaultForm fields={contactFields} isResetAfterSave onSaveForm={handleSendMessage} onChange={handleFieldChange} />
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
      </>
    </>
  );
}
