export const sortItems = ({ items, prop, order }) => {
  return items.slice().sort((a, b) => {
    const [first, second] = order === "asc" ? [a, b] : [b, a];
    if (prop === "amount") return parseFloat(first) - parseFloat(second);
    else if (prop === "date") {
      const difference = first[0] - second[0];
      return difference === 0 ? first[1] - second[1] : difference;
    } else if (prop === "name") return first.toLowerCase().localeCompare(second.toLowerCase());
  });
};

export const getIndexesArray = (length: number) => Array.from({ length }).map((_, index) => index);

export const getReverseIndexesArray = (length: number) => getIndexesArray(length).reverse();
