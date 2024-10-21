export const setUppercaseFirstLetter = (string: string): string => (string?.length ? string.charAt(0).toUpperCase() + string.slice(1) : "");
