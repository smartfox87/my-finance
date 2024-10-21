import { NotificationTypes } from "@/types/modals";
import type { NotificationInstance } from "antd/es/notification/interface";

let notification: NotificationInstance | undefined;

export const showNotification = async ({ title = "", text = "", duration = 8, type = NotificationTypes.INFO }: { title?: string; text?: string; duration?: number; type?: NotificationTypes }) => {
  if (!notification) notification = await import("antd/es/notification").then((mod) => mod.default as NotificationInstance);

  if ((title || text) && notification && type in notification) {
    notification[type]({
      message: title,
      description: text,
      placement: "topRight",
      duration,
    });
  }
};
