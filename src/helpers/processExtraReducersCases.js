import { message } from "antd";

export const handleRejected = (state, { type, payload, error }) => {
  console.error(type, payload || error);
  message.error(payload || error.message, 8);
};
