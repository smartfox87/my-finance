// import i18n from "@/i18n";

export const addHttpsToUrl = (url) => (url.includes("http") ? url : "https://" + url);

export const getPublicUrl = () => addHttpsToUrl(process.env.NEXT_PUBLIC_PUBLIC_URL ? process.env.NEXT_PUBLIC_PUBLIC_URL : process.env.NEXT_PUBLIC_VERCEL_URL);

// export const getLocalizeUrl = (url) => `/${i18n.language}${url}`;
export const getLocalizeUrl = (url) => `${url}`;
