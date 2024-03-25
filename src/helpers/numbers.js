export const getIntegerIfPossible = (value) => {
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? value : parsedValue;
};

export const checkIsNumber = (value) => typeof value === "number" && !isNaN(value);
