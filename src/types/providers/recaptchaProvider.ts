export interface RecaptchaContextType {
  initCaptcha: () => void;
  isLoadedCaptcha: boolean;
  getScore: (options?: { action?: string }) => Promise<number>;
}
