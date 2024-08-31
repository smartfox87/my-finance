import { notification } from "antd";
import { NotificationTypes } from "@/types/modals";

export const showNotification = ({ title = "", text = "", duration = 8, type = NotificationTypes.INFO }: { title?: string; text?: string; duration?: number; type?: NotificationTypes }) => {
  if ((title || text) && type in notification)
    notification[type]({
      message: title,
      description: text,
      placement: "topRight",
      duration,
    });
};
