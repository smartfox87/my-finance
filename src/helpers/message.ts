interface ErrorMessage {
  (text: string, duration?: number): void;
}

let errorMessage: ErrorMessage | null = null;

export const showErrorMessage = (text: string, duration?: number) => {
  if (errorMessage) errorMessage(text, duration);
  else
    import("antd/es/message").then(({ default: mod }) => {
      if ("error" in mod) errorMessage = mod.error;
      if (errorMessage) errorMessage(text, duration);
    });
};
