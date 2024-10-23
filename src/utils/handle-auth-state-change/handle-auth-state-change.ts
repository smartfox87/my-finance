import { apiClient } from "@/libs/api-client";
import { store } from "@/store";
import { clearUserReducer, setUserReducer } from "@/features/auth-store";

export const handleAuthStateChange = () => {
  apiClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      if (session) store.dispatch(setUserReducer(session.user));
    } else if (event === "SIGNED_OUT") {
      store.dispatch(clearUserReducer());
    } else if (event === "TOKEN_REFRESHED") {
      if (session) store.dispatch(setUserReducer(session.user));
    }
  });
};
