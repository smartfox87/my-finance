import dayjs, { type Dayjs } from "dayjs";
import { Button, DatePicker, Radio, type RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { findMatchingPeriod, getDatesPeriod, periodOptions } from "@/helpers/date";
import type { DatesPeriod } from "@/types/date";

const processDates = (dates: [string, string]): [Dayjs, Dayjs] => {
  const [from, to] = dates;
  return [dayjs(from), dayjs(to)];
};

export const PeriodField = ({ id = "", value, onChange }: { id: string; value: [string, string]; onChange: (dates: [string, string]) => void }) => {
  const { t } = useTranslation();
  const [datesValue, setDatesValue] = useState(processDates(value));
  const [periodValue, setPeriodValue] = useState<DatesPeriod | null>(findMatchingPeriod(value));

  useEffect(() => {
    setDatesValue(processDates(value));
    setPeriodValue(findMatchingPeriod(value));
  }, [value]);

  const handleChangeFieldValue = (_: any, value: [string, string]): void => {
    const newPeriod = findMatchingPeriod(value);
    if (newPeriod) setPeriodValue(newPeriod);
    setDatesValue(processDates(value));
    onChange(value);
  };

  const handleChangePeriod = (event: RadioChangeEvent): void => {
    const dates = getDatesPeriod(undefined, event.target.value);
    setPeriodValue(event.target.value);
    setDatesValue(processDates(dates));
    onChange(dates);
  };

  const handleToggleDates = (next: boolean): void => {
    if (!periodValue) return;
    const prevDate = (next ? datesValue[0].add(1, periodValue) : datesValue[0].subtract(1, periodValue)).format("YYYY-MM-DD");
    const dates = getDatesPeriod(prevDate, periodValue);
    setDatesValue(processDates(dates));
    onChange(dates);
  };

  return (
    <div id={id} className="flex flex-col gap-4">
      <Radio.Group
        className="w-full"
        size="large"
        value={periodValue}
        optionType="button"
        buttonStyle="solid"
        options={periodOptions?.map(({ label, value }) => ({ label: t(`fields.${label}`), value }))}
        onChange={handleChangePeriod}
      />
      <div className="flex gap-0 2xs:gap-3">
        <Button className="!px-1.5 3xs:!px-3 2xs:!px-4 xs:w-14" size="large" onClick={() => handleToggleDates(false)}>
          {"<"}
        </Button>
        <DatePicker.RangePicker className="w-full" size="large" value={datesValue} showTime format="YYYY-MM-DD" onChange={handleChangeFieldValue} />
        <Button className="!px-1.5 3xs:!px-3 2xs:!px-4 xs:w-14" size="large" onClick={() => handleToggleDates(true)}>
          {">"}
        </Button>
      </div>
    </div>
  );
};
