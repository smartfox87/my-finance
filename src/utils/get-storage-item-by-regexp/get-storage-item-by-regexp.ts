export const findStorageItemByRegExp = (regex: RegExp): string | null => Object.entries(localStorage).find(([key]) => regex.test(key))?.[1] || null;
