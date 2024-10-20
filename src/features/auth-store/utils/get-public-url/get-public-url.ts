import { PUBLIC_URL, VERCEL_URL } from "@/constants/config";
import { addHttpsToUrl } from "../add-https-to-url";

export const getPublicUrl = (): string => {
  const url = PUBLIC_URL ? PUBLIC_URL : VERCEL_URL;
  if (!url) throw new Error("No public URL found in environment variables");
  return addHttpsToUrl(url);
};
