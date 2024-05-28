import { supabase } from "@/api/supabase";
import { getPublicUrl } from "@/helpers/url";
import { LoginData, RegisterData } from "@/types/auth";
import { Provider } from "@supabase/auth-js";
import { store } from "@/store";
import { clearUserReducer, setUserReducer } from "@/store/authSlice";

let isAuthStateChangeHandlerSet = false;
export const handleAuthStateChange = () => {
  if (isAuthStateChangeHandlerSet) return;
  isAuthStateChangeHandlerSet = true;
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      if (session) store.dispatch(setUserReducer(session.user));
    } else if (event === "SIGNED_OUT") {
      store.dispatch(clearUserReducer());
    } else if (event === "TOKEN_REFRESHED") {
      if (session) store.dispatch(setUserReducer(session.user));
    }
  });
};

export const loginUserApi = ({ email, password }: LoginData) => supabase.auth.signInWithPassword({ email, password });

export const loginDemoUserApi = () =>
  supabase.auth.signInWithPassword({
    email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD,
  } as LoginData);

export const loginUserByProviderApi = (provider: Provider) =>
  supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getPublicUrl()}/redirect`,
    },
  });

export const registerUserApi = (userData: RegisterData) =>
  supabase.auth.signUp({
    ...userData,
    options: {
      data: { ...userData, password: undefined },
      emailRedirectTo: `${getPublicUrl()}/confirm`,
    },
  });

export const logoutUserApi = () => supabase.auth.signOut();

export const getUserSession = () => supabase.auth.getSession();

export const requestForgottenPassword = (email: string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getPublicUrl()}/reset`,
  });

export const updateUserPassword = (password: string) => supabase.auth.updateUser({ password });

export const resendEmailConfirmation = (email: string) =>
  supabase.auth.resend({
    type: "signup",
    email: email,
  });
