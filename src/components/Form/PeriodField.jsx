import dayjs from "dayjs";
import { Button, DatePicker, Radio } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { findMatchingPeriod, getDatesPeriod, periodOptions } from "@/helpers/date.js";
const { RangePicker } = DatePicker;

const processDates = (dates) => dates.map((date) => dayjs(date));

export const PeriodField = ({ value = [], onChange }) => {
  const { t } = useTranslation();
  const [datesValue, setDatesValue] = useState(processDates(value));
  const [periodValue, setPeriodValue] = useState(findMatchingPeriod(value));

  useEffect(() => {
    setDatesValue(processDates(value));
    setPeriodValue(findMatchingPeriod(value));
  }, [value]);

  const handleChangeFieldValue = (value) => {
    const dates = value.map((date) => date.format("YYYY-MM-DD"));
    const newPeriod = findMatchingPeriod(dates);
    if (newPeriod) setPeriodValue(newPeriod);
    setDatesValue(processDates(value));
    onChange(dates);
  };

  const handleChangePeriod = ({ target: { value } }) => {
    const dates = getDatesPeriod(undefined, value);
    setPeriodValue(value);
    setDatesValue(processDates(dates));
    onChange(dates);
  };

  const handleToggleDates = (next) => {
    const prevDate = (next ? datesValue[0].add(1, periodValue) : datesValue[0].subtract(1, periodValue)).format("YYYY-MM-DD");
    const dates = getDatesPeriod(prevDate, periodValue);
    setDatesValue(processDates(dates));
    onChange(dates);
  };

  return (
    <div className="flex flex-col gap-4">
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
        <RangePicker className="w-full" size="large" value={datesValue} showTime format="YYYY-MM-DD" onChange={handleChangeFieldValue} />
        <Button className="!px-1.5 3xs:!px-3 2xs:!px-4 xs:w-14" size="large" onClick={() => handleToggleDates(true)}>
          {">"}
        </Button>
      </div>
    </div>
  );
};

PeriodField.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};
