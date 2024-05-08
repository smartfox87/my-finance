interface ErrorMessage {
  (text: string, duration?: number): void;
}

let errorMessage: ErrorMessage;

export const showErrorMessage = (text: string, duration?: number) => {
  if (errorMessage) errorMessage(text, duration);
  else
    import("antd/es/message").then(({ default: mod }) => {
      errorMessage = mod.error;
      errorMessage(text, duration);
    });
};
