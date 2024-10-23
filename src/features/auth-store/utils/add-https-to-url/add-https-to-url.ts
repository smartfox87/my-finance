export const addHttpsToUrl = (url: string): string => (url.includes("http") ? url : "https://" + url);
