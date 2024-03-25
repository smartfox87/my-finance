import { supabase } from "@/api/supabase";
import { getPublicUrl } from "@/helpers/url";

export const loginUserApi = ({ email, password, score }) => supabase.auth.signInWithPassword({ email, password, score });

export const loginDemoUserApi = () => supabase.auth.signInWithPassword({ email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL, password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD });

export const loginUserByProviderApi = (provider) =>
  supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getPublicUrl()}/redirect`,
    },
  });

export const registerUserApi = (userData) =>
  supabase.auth.signUp({
    ...userData,
    options: {
      data: { ...userData, password: undefined },
      emailRedirectTo: `${getPublicUrl()}/confirm`,
    },
  });

export const logoutUserApi = () => supabase.auth.signOut();

export const getUserSession = () => supabase.auth.getSession();

export const requestForgottenPassword = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getPublicUrl()}/reset`,
  });

export const updateUserPassword = (password) => supabase.auth.updateUser({ password });

export const subscribeAuthStateChange = (callback) => supabase.auth.onAuthStateChange(callback);

export const resendEmailConfirmation = (email) =>
  supabase.auth.resend({
    type: "signup",
    email: email,
  });
