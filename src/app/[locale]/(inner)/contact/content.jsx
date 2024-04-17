"use client";
import { useTranslation } from "react-i18next";
import { Preloader } from "@/components/Layout/Preloader";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { showNotification } from "@/helpers/modals";
import { useEffect } from "react";
import { useRecaptcha } from "@/hooks/recaptcha";
import { selectContactFields } from "@/store/selectors/contact";
import { useSelector } from "react-redux";
import { useAntd } from "@/hooks/antd.js";

export default function ContactContent() {
  const { t } = useTranslation();
  const contactFields = useSelector(selectContactFields);
  const { initCAPTCHA, isLoaded, getScore } = useRecaptcha();
  const { initAntd, isLoadedAntd } = useAntd();

  useEffect(() => {
    if (!isLoaded) initCAPTCHA();
    if (!isLoadedAntd) initAntd();
  }, [initCAPTCHA, isLoaded]);

  const handleSendMessage = async (contactData) => {
    try {
      const score = await getScore();
      if (score < 0.5) return showNotification({ title: t("notifications.recaptcha_invalid") });
      const formData = new FormData();
      Object.keys(contactData)
        .filter((key) => contactData[key])
        .forEach((key) => (Array.isArray(contactData[key]) ? contactData[key].forEach((value) => formData.append(key, value)) : formData.append(key, contactData[key])));
      const { success } = await fetch("/api/contact", { method: "POST", body: formData }).then((res) => res.json());
      if (success) showNotification({ title: t("notifications.contact.success") });
    } catch (error) {
      console.error(error);
      showNotification({ title: error.message || t("notifications.contact.error") });
      return null;
    }
  };

  return (
    <Preloader isLoading={!isLoaded || !isLoadedAntd}>
      <DefaultForm fields={contactFields} isResetAfterSave onSaveForm={handleSendMessage} />
      <section className="flex shrink-0 flex-col gap-4 ">
        <h2 className="text-2xl font-bold">{t("seo.app_name")} & A.D.</h2>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-2">
            <b className="font-bold">{t("info.phone")}:</b>
            <a href="tel:+48573098898">+48 573 098 898</a>
          </li>
          <li className="flex gap-2">
            <b className="font-bold">{t("info.email")}:</b>
            <a href="mailto:contact@myfinance.day">contact@myfinance.day</a>
          </li>
          <li className="flex gap-2">
            <b className="font-bold">{t("info.address")}:</b> Waska 15, 15-481 Bialystok
          </li>
          <li className="flex gap-2">
            <b className="font-bold">{t("info.country")}:</b> Poland
          </li>
          <li className="flex gap-2">
            <b className="font-bold">{t("info.working_hours")}:</b> {t("info.every_day")} | 9:00 - 21:00
          </li>
        </ul>
      </section>
    </Preloader>
  );
}
