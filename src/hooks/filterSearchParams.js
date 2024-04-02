import { useEffect, useMemo } from "react";
import { getIntegerIfPossible } from "@/helpers/numbers.js";
import { useDispatch } from "react-redux";
import { isStringADate } from "@/helpers/date";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

export const useFilterSearchParams = (filterValues, setFilterValues) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsArray = Array.from(searchParams.entries());
  const sortedFilterValues = useMemo(
    () =>
      filterValues
        ? Object.entries(filterValues)
            ?.sort((a, b) => a[0].localeCompare(b[0]))
            .reduce((acc, [id, value]) => ({ ...acc, [id]: value }), {})
        : null,
    [filterValues],
  );

  const isFilterValuesFilled = useMemo(() => !!filterValues && !!Object.keys(filterValues).length, [filterValues]);

  const paramsObject = useMemo(() => {
    if (searchParamsArray.length && filterValues)
      return searchParamsArray.reduce((acc, [key, value]) => {
        const newValue = isStringADate(value) ? value : getIntegerIfPossible(value);
        return {
          ...acc,
          [key]: acc[key] ? [...acc[key], newValue] : Array.isArray(filterValues[key]) ? [newValue] : newValue,
        };
      }, {});
  }, [searchParamsArray, filterValues]);

  const isNotEqualParamsToFilters = useMemo(() => JSON.stringify(paramsObject) !== JSON.stringify(sortedFilterValues), [paramsObject, sortedFilterValues]);

  useEffect(() => {
    if (isFilterValuesFilled) {
      if (searchParamsArray.length && isNotEqualParamsToFilters) {
        dispatch(setFilterValues(Object.keys(paramsObject).map((key) => ({ id: key, value: paramsObject[key] }))));
      }
    }
  }, [isFilterValuesFilled]);

  useEffect(() => {
    if (isFilterValuesFilled && isNotEqualParamsToFilters) router.push(`${pathname}?${queryString.stringify(filterValues)}`);
  }, [isFilterValuesFilled, filterValues, isNotEqualParamsToFilters]);

  return [isNotEqualParamsToFilters, isFilterValuesFilled];
};
