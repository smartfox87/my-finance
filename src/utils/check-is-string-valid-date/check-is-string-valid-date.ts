export const checkIsStringValidDate = (str: string): boolean => {
  if (str.length < 10) return false;
  return !isNaN(Date.parse(str));
};
