export const replacedEmptyValuesOnNull = (dataObject) => Object.keys(dataObject).reduce((acc, key) => ({ ...acc, [key]: dataObject[key] || null }), {});

export const checkItemIsObject = (item) => !!item && typeof item === "object" && !Array.isArray(item);

export const getOnlyValuesFromData = (data) =>
  Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: checkItemIsObject(data[key]) ? data[key]?.id : Array.isArray(data[key]) ? data[key].map((item) => item.id || item) : data[key] }), {});
