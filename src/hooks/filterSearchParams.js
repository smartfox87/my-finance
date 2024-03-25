import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getIntegerIfPossible } from "@/helpers/numbers.js";
import { useDispatch } from "react-redux";
import { isStringADate } from "@/helpers/date.js";

export const useFilterSearchParams = (filterValues, setFilterValues) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const isFilterValuesFilled = useMemo(() => !!filterValues && !!Object.keys(filterValues).length, [filterValues]);

  const paramsObject = useMemo(() => {
    const searchParamsArray = Array.from(searchParams);
    if (searchParamsArray.length && filterValues)
      return searchParamsArray.reduce((acc, [key, value]) => {
        const newValue = isStringADate(value) ? value : getIntegerIfPossible(value);
        return {
          ...acc,
          [key]: acc[key] ? [...acc[key], newValue] : Array.isArray(filterValues[key]) ? [newValue] : newValue,
        };
      }, {});
  }, [searchParams, filterValues]);

  const isNotEqualParamsToFilters = useMemo(() => JSON.stringify(paramsObject) !== JSON.stringify(filterValues), [paramsObject, filterValues]);

  useEffect(() => {
    if (isFilterValuesFilled) {
      const searchParamsArray = Array.from(searchParams);
      if (searchParamsArray.length && isNotEqualParamsToFilters) {
        dispatch(setFilterValues(Object.keys(paramsObject).map((key) => ({ id: key, value: paramsObject[key] }))));
      }
    }
  }, [isFilterValuesFilled]);

  useEffect(() => {
    if (isFilterValuesFilled && isNotEqualParamsToFilters) setSearchParams(filterValues);
  }, [isFilterValuesFilled, filterValues, isNotEqualParamsToFilters]);

  return [isNotEqualParamsToFilters, isFilterValuesFilled];
};
