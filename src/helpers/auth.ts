import { apiClient } from "@/lib/api-client";
import { store } from "@/store";

export const handleAuthStateChange = () => {
  apiClient.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      if (session) store.dispatch({ type: "auth/setUserReducer", payload: session.user });
    } else if (event === "SIGNED_OUT") {
      store.dispatch({ type: "auth/clearUserReducer" });
    } else if (event === "TOKEN_REFRESHED") {
      if (session) store.dispatch({ type: "auth/setUserReducer", payload: session.user });
    }
  });
};
