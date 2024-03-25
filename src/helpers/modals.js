import { notification } from "antd";

export const showNotification = ({ title = "", text = "" }) => {
  if (title || text)
    notification.info({
      message: title,
      description: text,
      placement: "topRight",
      duration: 8,
    });
};
