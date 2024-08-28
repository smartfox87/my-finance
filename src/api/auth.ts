import { apiClient } from "@/lib/api-client";
import { getPublicUrl } from "@/helpers/url";
import { LoginData, RegisterData } from "@/types/auth";
import { Provider } from "@supabase/auth-js";

export const loginUserApi = ({ email, password }: LoginData) => apiClient.auth.signInWithPassword({ email, password });

export const loginDemoUserApi = () =>
  apiClient.auth.signInWithPassword({
    email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD,
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
