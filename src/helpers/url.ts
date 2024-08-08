export const addHttpsToUrl = (url: string): string => (url.includes("http") ? url : "https://" + url);

export const getPublicUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_PUBLIC_URL ? process.env.NEXT_PUBLIC_PUBLIC_URL : process.env.NEXT_PUBLIC_VERCEL_URL;
  if (!url) throw new Error("No public URL found in environment variables");
  return addHttpsToUrl(url);
};
