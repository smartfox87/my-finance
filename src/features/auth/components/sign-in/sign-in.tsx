"use client";

import { INITIAL_SIGN_IN_FIELDS } from "../../constants";
import { useAppDispatch } from "@/hooks/store";
import { isLoginData } from "../../predicates";
import { DefaultForm } from "@/features/default-form";
import { loginUserThunk } from "@/features/auth-store";
import { useRouter } from "next/navigation";
import { captureException } from "@sentry/nextjs";
import { IS_PRODUCTION } from "@/constants/config";
import type { DefaultFormSaveHandler } from "@/features/default-form";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmitForm: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isLoginData(fieldsValues)) return;
      await dispatch(loginUserThunk(fieldsValues)).unwrap();
      router.push("/");
    } catch (error) {
      if (IS_PRODUCTION) captureException(error);
    }
  };

  return <DefaultForm fields={INITIAL_SIGN_IN_FIELDS} data-cy="login-form" onSaveForm={handleSubmitForm} />;
};
