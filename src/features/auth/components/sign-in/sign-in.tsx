"use client";

import { INITIAL_SIGN_IN_FIELDS } from "../../constants";
import { useAppDispatch } from "@/hooks/store";
import { isLoginData } from "../../predicates";
import { DefaultForm } from "@/features/default-form";
import { loginUserThunk } from "@/store/slices/auth";
import { useRouter } from "next/navigation";
import type { DefaultFormSaveHandler } from "@/types/form";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmitForm: DefaultFormSaveHandler = async (fieldsValues) => {
    if (!isLoginData(fieldsValues)) return;
    dispatch(loginUserThunk(fieldsValues))
      .unwrap()
      .then(() => router.push("/"));
  };

  return <DefaultForm fields={INITIAL_SIGN_IN_FIELDS} data-cy="login-form" onSaveForm={handleSubmitForm} />;
};
