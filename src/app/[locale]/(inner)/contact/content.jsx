"use client";
import { useTranslation } from "react-i18next";
import { Preloader } from "@/components/Layout/Preloader";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { showNotification } from "@/helpers/modals";
import { useEffect } from "react";
import { useRecaptcha } from "@/hooks/recaptcha";
import { selectContactFields } from "@/store/selectors/contact";
import { useSelector } from "react-redux";

export const ContactContent = () => {
  const { t } = useTranslation();
  const contactFields = useSelector(selectContactFields);
  const { initCAPTCHA, isLoaded, getScore } = useRecaptcha();

  useEffect(() => {
    if (!isLoaded) initCAPTCHA();
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
    <Preloader isLoading={!isLoaded}>
      <DefaultForm fields={contactFields} isResetAfterSave onSaveForm={handleSendMessage} />
    </Preloader>
  );
};
