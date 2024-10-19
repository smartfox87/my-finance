import { Button, DatePicker, Radio, type RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PERIOD_OPTIONS } from "@/constants/date";
import { findMatchingPeriod, convertDatesToDayjs } from "@/utils/date";
import { getDatesPeriodValues } from "@/utils/get-dates-period-values";
import type { Dayjs } from "dayjs";
import type { DatesPeriod, DatesStrings } from "@/types/date";

export const PeriodField = ({ id = "", value, onChange }: { id: string; value: DatesStrings; onChange: (dates: DatesStrings) => void }) => {
  const { t } = useTranslation();
  const [datesValue, setDatesValue] = useState(convertDatesToDayjs(value));
  const [periodValue, setPeriodValue] = useState<DatesPeriod | null>(findMatchingPeriod(value));

  useEffect((): void => {
    setDatesValue(convertDatesToDayjs(value));
    setPeriodValue(findMatchingPeriod(value));
  }, [value]);

  const handleChangeFieldValue = (_: [Dayjs | null, Dayjs | null] | null, value: DatesStrings): void => {
    const newPeriod = findMatchingPeriod(value);
    if (newPeriod) setPeriodValue(newPeriod);
    setDatesValue(convertDatesToDayjs(value));
    onChange(value);
  };

  const handleChangePeriod = (event: RadioChangeEvent): void => {
    const dates = getDatesPeriodValues(undefined, event.target.value);
    setPeriodValue(event.target.value);
    setDatesValue(convertDatesToDayjs(dates));
    onChange(dates);
  };

  const handleToggleDates = (next: boolean): void => {
    if (!periodValue) return;
    const prevDate = (next ? datesValue[0].add(1, periodValue) : datesValue[0].subtract(1, periodValue)).format("YYYY-MM-DD");
    const dates = getDatesPeriodValues(prevDate, periodValue);
    setDatesValue(convertDatesToDayjs(dates));
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
        options={PERIOD_OPTIONS?.map(({ label_translation, value }) => ({ label: t(`fields.${label_translation}`), value }))}
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
