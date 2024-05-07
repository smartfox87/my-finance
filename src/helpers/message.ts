interface ErrorMessage {
  (text: string): void;
}

let errorMessage: ErrorMessage | null = null;

export const showErrorMessage = (text: string) => {
  if (errorMessage) errorMessage(text);
  else
    import("antd/es/message").then(({ default: mod }) => {
      if ("error" in mod) errorMessage = mod.error;
      if (errorMessage) errorMessage(text);
    });
};
