import { notification } from "antd";

export const showNotification = ({ title = "", text = "", duration = 8 }) => {
  if (title || text)
    notification.info({
      message: title,
      description: text,
      placement: "topRight",
      duration,
    });
};
