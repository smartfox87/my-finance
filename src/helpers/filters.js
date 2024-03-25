export const checkIsClearableFilter = ({ id, value }) => !["sort", "period"].includes(id) && value !== "all";

export const setFilterValue = (filterValues, { id, value }) => {
  const state = { ...filterValues };
  if (Array.isArray(value)) {
    if (!value?.length || (!state[id]?.includes("all") && value.includes("all")) || (value.length === 1 && value.includes("all"))) state[id] = ["all"];
    else state[id] = value.filter((val) => val !== "all");
  } else state[id] = value;
  return state;
};
