export type GetScore = (options?: { action?: string }) => Promise<number>;

export interface RecaptchaContextType {
  initCaptcha: () => void;
  isLoadedCaptcha: boolean;
  getScore: GetScore;
}
