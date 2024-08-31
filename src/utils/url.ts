import { PUBLIC_URL, VERCEL_URL } from "@/constants/config";

export const addHttpsToUrl = (url: string): string => (url.includes("http") ? url : "https://" + url);

export const getPublicUrl = (): string => {
  const url = PUBLIC_URL ? PUBLIC_URL : VERCEL_URL;
  if (!url) throw new Error("No public URL found in environment variables");
  return addHttpsToUrl(url);
};
