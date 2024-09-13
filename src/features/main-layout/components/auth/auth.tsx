"use client";

import SvgSignIn from "@/assets/sprite/sign-in.svg";
import { SimpleButton } from "@/components/simple-button";
import { useViewport } from "@/hooks/viewport";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const Auth = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const router = useRouter();

  return (
    <>
      <SimpleButton type="primary" data-cy="modal-login-btn" onClick={() => router.push("/auth/sign-in")}>
        <SvgSignIn className="h-4 w-4" />
        {!isMobile ? t("buttons.sign_in") : null}
      </SimpleButton>
    </>
  );
};
