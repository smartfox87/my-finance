import { getFullDate } from "@/helpers/date";

export const BudgetDate = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const isDifferentMonths = startDate !== endDate;
  return (
    <div className="flex items-center justify-center gap-2 rounded-[8px] border border-black p-2 capitalize leading-none dark:border-white">
      <time dateTime={startDate} data-cy="item-date">
        {getFullDate(startDate, "DD.MM.YYYY")}
      </time>
      {isDifferentMonths && (
        <>
          <span>-</span>
          <time dateTime={endDate}>{getFullDate(endDate, "DD.MM.YYYY")}</time>
        </>
      )}
    </div>
  );
};
