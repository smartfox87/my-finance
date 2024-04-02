export const addHttpsToUrl = (url) => (url.includes("http") ? url : "https://" + url);

export const getPublicUrl = () => addHttpsToUrl(process.env.NEXT_PUBLIC_PUBLIC_URL ? process.env.NEXT_PUBLIC_PUBLIC_URL : process.env.NEXT_PUBLIC_VERCEL_URL);
