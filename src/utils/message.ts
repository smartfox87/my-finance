import { NotificationTypes } from "@/types/modals";
import type { MessageInstance } from "antd/es/message/interface";

let errorMessage: MessageInstance[NotificationTypes.ERROR] | undefined;

export const showErrorMessage = async (text: string, duration?: number): Promise<void> => {
  if (errorMessage) {
    errorMessage(text, duration);
  } else {
    const message = await import("antd/es/message").then((mod) => mod.default);
    errorMessage = message[NotificationTypes.ERROR];
    errorMessage(text, duration);
  }
};
