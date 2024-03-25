import PropTypes from "prop-types";
import { getFullDate } from "@/helpers/date.js";

export const CommonDate = ({ date }) => (
  <time dateTime={date} className="flex items-center justify-center rounded-[8px] border border-black p-2 leading-none dark:border-white">
    {getFullDate(date, "DD MMMM YYYY")}
  </time>
);

CommonDate.propTypes = {
  date: PropTypes.string,
};
