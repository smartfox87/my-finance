import { apiClient } from "@/libs/api-client";
import { getPublicUrl } from "../utils";
import { DEMO_USER_EMAIL, DEMO_USER_PASSWORD } from "@/constants/config";
import type { Provider } from "@supabase/auth-js";
import type { LoginData, RegisterData } from "../types";

export const loginUserApi = ({ email, password }: LoginData) => apiClient.auth.signInWithPassword({ email, password });

export const loginDemoUserApi = () =>
  apiClient.auth.signInWithPassword({
    email: DEMO_USER_EMAIL,
    password: DEMO_USER_PASSWORD,
  } as LoginData);

export const loginUserByProviderApi = (provider: Provider) =>
  apiClient.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getPublicUrl()}/redirect`,
    },
  });

export const registerUserApi = (userData: RegisterData) =>
  apiClient.auth.signUp({
    ...userData,
    options: {
      data: { ...userData, password: undefined },
      emailRedirectTo: `${getPublicUrl()}/confirm`,
    },
  });

export const logoutUserApi = () => apiClient.auth.signOut();

export const getUserSession = () => apiClient.auth.getSession();

export const requestForgottenPassword = (email: string) =>
  apiClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${getPublicUrl()}/reset`,
  });

export const updateUserPassword = (password: string) => apiClient.auth.updateUser({ password });

export const resendEmailConfirmation = (email: string) =>
  apiClient.auth.resend({
    type: "signup",
    email: email,
  });
