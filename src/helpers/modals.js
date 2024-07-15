import { notification } from "antd";

export const showNotification = ({ title = "", text = "", duration = 8, type = "info" }) => {
  if (title || text)
    notification[type]({
      message: title,
      description: text,
      placement: "topRight",
      duration,
    });
};
