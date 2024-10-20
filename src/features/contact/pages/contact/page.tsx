"use client";

import { DefaultForm } from "@/features/default-form";
import { showNotification } from "@/utils/modals";
import { useRecaptcha } from "@/hooks/providers/recaptcha";
import { selectContactFields } from "../../selectors";
import { isRcFileArray } from "@/predicates/field";
import { isError, isStringNumber } from "@/predicates/common";
import { showCommonError } from "@/utils/show-common-error";
import { Info } from "../../components";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { Jsonld } from "../../components";
import { useAppSelector } from "@/hooks/store";
import type { FormValues } from "@/types/form";

export default function Page() {
  const { t } = useTranslation();
  const { initCaptcha, isLoadedCaptcha, getScore } = useRecaptcha();
  const contactFields = useAppSelector(selectContactFields);

  const handleFieldChange = useCallback((): void => {
    if (!isLoadedCaptcha) initCaptcha();
  }, [isLoadedCaptcha, initCaptcha]);

  const handleSendMessage = useCallback(
    async (contactData: FormValues): Promise<void> => {
      try {
        const score = await getScore();
        if (score < 0.5) return showCommonError({ title: t("notifications.recaptcha_invalid") });

        const formData = new FormData();
        Object.entries(contactData).forEach(([key, value]) => {
          if (isRcFileArray(value)) value.forEach((value) => formData.append(key, value));
          else if (isStringNumber(value)) formData.append(key, value.toString());
        });

        const { success, error } = await fetch("/api/contact", { method: "POST", body: formData }).then((res) => res.json());
        if (success) showNotification({ title: t("notifications.contact.success") });
        else showCommonError({ error });
      } catch (error) {
        showCommonError({ title: isError(error) ? error.message : "" });
      }
    },
    [getScore],
  );

  return (
    <>
      <Jsonld />
      <DefaultForm fields={contactFields} isResetAfterSave onSaveForm={handleSendMessage} onChange={handleFieldChange} />
      <Info />
    </>
  );
}
