import PropTypes from "prop-types";
import { getFullDate } from "@/helpers/date.js";

export const BudgetDate = ({ startDate, endDate }) => {
  const isDifferentMonths = startDate !== endDate;
  return (
    <div className="flex items-center justify-center gap-2 rounded-[8px] border border-black p-2 capitalize leading-none dark:border-white">
      <time dateTime={startDate}>{getFullDate(startDate, "DD.MM.YYYY")}</time>
      {isDifferentMonths && (
        <>
          <span>-</span>
          <time dateTime={endDate}>{getFullDate(endDate, "DD.MM.YYYY")}</time>
        </>
      )}
    </div>
  );
};

BudgetDate.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};
