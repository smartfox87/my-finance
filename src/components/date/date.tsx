import { getFormattedDateString } from "@/utils/get-formatted-date-string";

export const Date = ({ date }: { date: string }) => (
  <time dateTime={date} data-cy="item-date" className="flex items-center justify-center rounded-[8px] border border-black p-2 leading-none dark:border-white">
    {getFormattedDateString(date, "DD MMMM YYYY")}
  </time>
);
